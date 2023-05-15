import { body } from "express-validator";

export const companyValidation = [
 body(
  "name",
  "Company name should contain at least 2 symbols, maximum 30 symbols"
 ).isLength({
  min: 2,
  max: 30,
 }),
 body(
  "description",
  "Company description should contain at least 10 symbols, maximum 1000 symbols"
 ).isLength({
  min: 10,
  max: 1000,
 }),
];

export const deviceValidation = [body("imgUrl", "Invalid avatar link").isURL()];
