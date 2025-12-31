import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import axios from 'axios';
import 'dotenv/config';

// Import Your Models
import Vehicle from './models/Vehicle.js';
import Challan from './models/Challan.js';
import SpeedZone from './models/SpeedZone.js';

const app = express();
const PORT = 8000;

app.use(cors());
// Increase payload limit and accept form-urlencoded (which apps often use)
app.use(express.json({ limit: '10kb' })); 
app.use(express.urlencoded({ extended: true }));

// --- Database Connection ---
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('✅ Database connected successfully!'))
  .catch((err) => console.error('Database connection error:', err));

// --- Speed Limit Function ---
async function getSpeedLimit(latitude, longitude) {
  try {
    // Check our custom database zones first
    const zone = await SpeedZone.findOne({
      lat_min: { $lte: latitude },
      lat_max: { $gte: latitude },
      lon_min: { $lte: longitude },
      lon_max: { $gte: longitude }
    });

    if (zone) {
      console.log(`Zone found: ${zone.zoneName}, Speed Limit: ${zone.speedLimit} km/h`);
      return zone.speedLimit;
    }
    
    console.warn('No custom speed zone found. Using default 60 km/h.');
    return 60; 
  } catch (error) {
    return 60;
  }
}

// --- API Endpoints ---

app.post('/api/ingest', async (req, res) => {
  try {
    let vehicleNumber, speed, latitude, longitude, locationName;

    // --- NEW PARSING LOGIC START ---
    console.log("Raw Body Received:", req.body);

    // Scenario 1: Data from your App (Nested JSON in 'content' string)
    if (req.body.content) {
        try {
            // The 'content' field is a STRING containing JSON. We must parse it.
            const innerData = JSON.parse(req.body.content);
            
            vehicleNumber = innerData.vehicleNumber;
            speed = parseFloat(innerData.speed);
            latitude = parseFloat(innerData.latitude);
            longitude = parseFloat(innerData.longitude);
            locationName = innerData.locationName || "Live from App";
            
            console.log(`Parsed Nested JSON: ID=${vehicleNumber}, Speed=${speed}`);
        } catch (e) {
            console.error("Failed to parse inner JSON string in 'content' field");
        }
    } 
    // Scenario 2: Standard JSON (e.g. Postman or direct Device POST)
    else if (req.body.vehicleNumber) {
        ({ vehicleNumber, speed, latitude, longitude, locationName } = req.body);
    }

    // --- PARSING LOGIC END ---

    // Validation
    if (!vehicleNumber || speed === undefined || !latitude || !longitude) {
        console.error("Missing data fields after parsing.");
        return res.status(400).json({ error: "Invalid data format" });
    }

    // --- LOGIC ---
    const speedLimit = await getSpeedLimit(latitude, longitude);

    if (speed > speedLimit) {
      const newChallan = new Challan({
        vehicleNumber: vehicleNumber, // Ensure this matches your MongoDB "vehicleNumber" exactly
        violation: 'Overspeeding',
        date: new Date().toLocaleDateString('en-IN'),
        time: new Date().toLocaleTimeString('en-IN'),
        location: locationName || `Lat: ${latitude}, Lon: ${longitude}`,
        speed: `${speed} km/h`,
        speedLimit: `${speedLimit} km/h`,
        amount: 2000,
        status: 'Pending',
        camera: 'SAVER-IoT',
      });
      
      await newChallan.save();
      console.log(`🚨 Challan created for ${vehicleNumber} (Speed: ${speed}/${speedLimit})`);
      return res.status(201).json({ message: 'Challan created' });
    }

    console.log(`✅ Data received for ${vehicleNumber}. Speed OK (${speed}/${speedLimit}).`);
    return res.status(200).json({ message: 'Data received. Speed OK.' });

  } catch (error) {
    console.error('Error in /api/ingest:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/challans/:vehicleNumber', async (req, res) => {
  try {
    const { vehicleNumber } = req.params;
    
    // Using regex to make search case-insensitive
    const vehicle = await Vehicle.findOne({ 
      vehicleNumber: { $regex: new RegExp(`^${vehicleNumber}$`, "i") } 
    });
    
    const challans = await Challan.find({ 
      vehicleNumber: { $regex: new RegExp(`^${vehicleNumber}$`, "i") } 
    });

    if (!vehicle) return res.status(404).json({ error: 'Vehicle details not found' });

    res.status(200).json({ ...vehicle.toObject(), challans });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});