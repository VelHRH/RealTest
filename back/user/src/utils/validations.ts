import {body} from 'express-validator'

export const registerValidation = [
  body('email', 'Invalid email').isEmail(),
  body('password', 'Password should contain at least 8 symbols').isLength({min: 8}),
  body('login', 'Login should contain at least 3 symbols').isLength({min: 3}),
  body('avatarUrl', 'Invalid avatar link').optional().isURL()
];

export const passwordValidation = [
  body('newPassword', 'Password should contain at least 8 symbols').isLength({min: 8}),
];