import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  vehicleNumber: { type: String, required: true, unique: true, uppercase: true },
  ownerName: { type: String, required: true },
  vehicleType: { type: String, default: "Private Car" },
  make: String,
  model: String,
  year: String,
  fuelType: String,
  registrationDate: { type: String },
  insuranceStatus: { type: String },
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
export default Vehicle;