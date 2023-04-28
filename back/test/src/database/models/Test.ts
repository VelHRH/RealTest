import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
 purchaseId: {
  type: String,
  required: true,
 },
 testCreator: {
  type: String,
  required: true,
 },
 testStart: {
  type: Date,
  required: true,
 },
 testEnd: {
  type: Date,
  required: true,
 },
 reportingFrequency: {
  type: String,
  required: true,
 },
 trackingRange: {
  type: Number,
  required: true,
 },
});

export const TestModel = mongoose.model("Test", TestSchema);
