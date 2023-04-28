import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
 name: {
  type: String,
  required: true,
 },
 owner: {
  type: String,
  required: true,
 },
 admins: Array,
 avatarUrl: {
  type: String,
  required: true,
 },
 ratings: {
  type: Array,
  default: [],
 },
 tests: {
  type: Array,
  default: [],
 },
 balance: {
  type: Number,
  default: 0,
 },
});

export const CompanyModel = mongoose.model("Company", CompanySchema);
