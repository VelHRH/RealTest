import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema({
 companyId: {
  type: String,
  required: true,
 },
 deviceId: {
  type: String,
  required: true,
 },
 isFree: {
  type: Boolean,
  default: true,
 },
 defaultReportingFrequency: {
  type: String,
  default: "Every hour",
 },
 defaultTrackingRange: {
  type: Number,
  default: 3,
 },
 delivered: {
  type: Boolean,
  default: false,
 },
});

export const PurchaseModel = mongoose.model("Purchase", PurchaseSchema);
