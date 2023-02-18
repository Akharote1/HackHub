import { Router } from "express"
import { body } from "express-validator"
import * as HackathonController from "../controllers/Hackathon.js"
import authenticate from "../middleware/authenticate.js"
import validateInput from "../middleware/validate.js"

const router = Router()

router.get('/list', HackathonController.list)

router.get('/view/:slug', HackathonController.view)

router.get('/statistics/:slug', HackathonController.statistics)

router.get('/communications/:slug', HackathonController.communications)

router.get('/ps/:slug', HackathonController.statements)

router.get('/registrations/:slug', HackathonController.listRegistrations)

router.post('/create', 
  authenticate,
  validateInput,
  HackathonController.create
)

router.post('/send-mail/:slug', 
  authenticate,
  body('subject').isString(),
  body('content').isString(),
  body('target').isString(),
  validateInput,
  HackathonController.sendMail
)

router.post('/ps-update/:slug', 
  authenticate,
  body('statements').isArray(),
  validateInput,
  HackathonController.updatePS
)

router.post('/ps-setting/:slug', 
  authenticate,
  body('ps_list_released').isBoolean(),
  body('ps_form_released').isBoolean(),
  validateInput,
  HackathonController.updatePSSettings
)

const HackathonRouter = router;
export default HackathonRouter;