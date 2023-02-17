import { Router } from "express"
import { body, validationResult } from "express-validator";
import authenticate from "../middleware/authenticate.js";
import validateInput from "../middleware/validate.js";
import * as TeamController from "./../controllers/Team.js"

const router = Router()

router.post('/register/:slug',
  authenticate,
  body('team_name').isString().isLength(2, 20),
  body('team_members').isArray(),
  validateInput,
  (req, res) => TeamController.register(req, res)
)

router.post('/submit-screening/:teamID', 
  body('abstract_text').optional().isString(),
  body('presentation_link').optional().isString(),
  validateInput,
  (req, res) => TeamController.submitScreening(req, res)
)

const TeamRouter = router;
export default TeamRouter;