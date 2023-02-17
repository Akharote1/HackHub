import { Router } from "express"
import * as HackathonController from "../controllers/Hackathon.js"
import authenticate from "../middleware/authenticate.js"
import validateInput from "../middleware/validate.js"

const router = Router()

router.get('/list', HackathonController.list)

router.get('/view/:slug', HackathonController.view)

router.post('/create', 
  authenticate,
  validateInput,
  HackathonController.create
)

const HackathonRouter = router;
export default HackathonRouter;