import { validationResult } from "express-validator";

const validateInput = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array(), message: 'Invalid request' });
  }
  next()
}

export default validateInput;