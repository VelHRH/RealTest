import { body } from "express-validator";

export const companyValidation = [
 body(
  "name",
  "Company name should contain at least 2 symbols, maximum 30 symbols"
 ).isLength({
  min: 2,
  max: 30,
 }),
 body("avatarUrl", "Invalid avatar link").isURL(),
];

export const deviceValidation = [body("imgUrl", "Invalid avatar link").isURL()];
