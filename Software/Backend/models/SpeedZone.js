import mongoose from 'mongoose';

const speedZoneSchema = new mongoose.Schema({
  zoneName: { type: String, required: true },
  lat_min: { type: Number, required: true },
  lat_max: { type: Number, required: true },
  lon_min: { type: Number, required: true },
  lon_max: { type: Number, required: true },
  speedLimit: { type: Number, required: true },
});

const SpeedZone = mongoose.model('SpeedZone', speedZoneSchema);
export default SpeedZone;