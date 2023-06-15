import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
 purchaseId: {
  type: String,
  required: true,
 },
 productId: {
  type: String,
  required: true,
 },
 companyId: {
  type: String,
  required: true,
 },
 name: {
  type: String,
  required: true,
 },
 testCreator: {
  type: String,
  required: true,
 },
 testStart: Date,
 testEnd: Date,
 reportingFrequency: String,
 trackingRange: Number,
 isExecuted: {
  type: Boolean,
  default: false,
 },
});

export const TestModel = mongoose.model("Test", TestSchema);
