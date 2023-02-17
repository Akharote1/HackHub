import { Router } from "express"
import * as EventController from "../controllers/Event.js"

const router = Router()

router.get('/hey', 
  EventController.hey
)

const EventRouter = router;
export default EventRouter;