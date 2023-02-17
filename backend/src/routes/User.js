import { Router } from "express"
import { body, validationResult } from "express-validator";
import validateInput from "../middleware/validate.js";
import * as UserController from "./../controllers/User.js"

const router = Router()

router.post('/register', 
  body('name').isString().isLength(2, 64),
  body('email').isEmail().toLowerCase(),
  body('phone').isMobilePhone(),
  body('password').isString().isLength({ min: 6, max: 64 }),
  body('college').optional().isString(),
  body('gender').optional().default('unknown').isString(),
  validateInput,
  (req, res) => UserController.register(req, res)
)

router.post('/login', 
  body('email').isEmail().toLowerCase(),
  body('password').isString().isLength({ min: 6, max: 64 }),
  validateInput,
  (req, res) => UserController.login(req, res)
)


// router.get('/data',
//   authenticate,
//   (req, res) => UserController.userData(req, res)
// )

// router.post('/update/:id', 
//   authenticate,
//   body('email').optional().isEmail().toLowerCase(),
//   body('name').optional().isString().isLength(2, 64),
//   body('phone').optional().isMobilePhone(),
//   body('gender').optional().isString(),
//   body('college').optional().isString(),
//   body('domains').optional().isArray(),
//   validateInput,
//   (req, res) => UserController.update(req, res)
// )
const UserRouter = router;
export default UserRouter;