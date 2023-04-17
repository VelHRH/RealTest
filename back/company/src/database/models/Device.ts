import mongoose from "mongoose";

const DeviceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  reportingFrequency: {
    type: String,
    default: "Daily"
  }
});

export const DeviceModel = mongoose.model('Device', DeviceSchema);