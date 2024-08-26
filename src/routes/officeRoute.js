import { Router } from "express";

import officeController from "../controllers/officeController.js";
import { officePostValidation } from "../validators/officeValidator.js";
import authorization from "../auth/authorize.js";

const router = Router();

router
  .route("/")
  .post(authorization("offices", "Create"), officePostValidation, officeController.createOffice);

export default router;
