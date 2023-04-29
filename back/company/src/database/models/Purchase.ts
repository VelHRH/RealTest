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
 defaultReportingFrequency: {
  type: String,
  default: "Daily",
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
