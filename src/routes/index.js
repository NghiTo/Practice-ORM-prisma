import { Router } from "express";

import employeeRoute from "./employeeRoute.js";
import customerRoute from "./customerRoute.js";
import userRoute from "./userRoute.js";
import logRoute from "./logRoute.js";
import officeRoute from "./officeRoute.js";
import reportRoute from "./reportRoute.js";
import authentication from "../auth/authenticate.js";

const router = Router();

router.use("/employees", authentication, employeeRoute);
router.use("/customers", authentication, customerRoute);
router.use("/offices", authentication, officeRoute);
router.use("/report", authentication, reportRoute);
router.use("/users", userRoute);
router.use("/logs", logRoute);

export default router;
