import mongoose from "mongoose";

const DeviceSchema = new mongoose.Schema({
 name: {
  type: String,
  required: true,
 },
 description: {
  type: String,
  required: true,
 },
 imgUrl: {
  type: String,
  required: true,
 },
 price: {
  type: Number,
  required: true,
 },
});

export const DeviceModel = mongoose.model("Device", DeviceSchema);
