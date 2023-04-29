import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
 testId: {
  type: String,
  required: true,
 },
 resultStart: {
  type: Date,
  required: true,
 },
 resultEnd: {
  type: Date,
  required: true,
 },
 data: {
  type: Array,
  required: true,
 },
});

export const ResultModel = mongoose.model("Result", ResultSchema);
