import { Router } from "express";

import logController from "../controllers/logController.js";
import {
  logPutValidation,
  logGetValidation,
} from "../validators/logValidator.js";

const router = Router();

router.route("/").get(logGetValidation, logController.getLogInfo);
router.route("/:id").put(logPutValidation, logController.updateLogLevel);

export default router;
