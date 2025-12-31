import mongoose from 'mongoose';

const challanSchema = new mongoose.Schema({
  vehicleNumber: { type: String, required: true, uppercase: true },
  violation: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  speed: { type: String },
  speedLimit: { type: String },
  amount: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  camera: { type: String },
});

const Challan = mongoose.model('Challan', challanSchema);
export default Challan;