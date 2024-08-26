import { Router } from "express";
import {generateReport} from "../controllers/reportController.js";
import reportGetValidation from "../validators/reportValidator.js";

const router = Router();

router.route("/").get(reportGetValidation, generateReport);

export default router;