import { Router } from "express";

import { createUser, login } from "../controllers/userController.js";
import userValidation from "../validators/userValidator.js";

const router = Router();

router.post("/register", userValidation, createUser);
router.post("/login", login);

export default router;
