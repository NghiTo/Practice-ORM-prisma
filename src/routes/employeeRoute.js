import { Router } from "express";
import {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployees,
} from "../controllers/employeeController.js";
import authorization from "../auth/authorize.js";
import {employeePostValidation, employeePutValidation} from "../validators/employeeValidator.js";

const router = Router();

router
  .route("/")
  .get(authorization("employees", "Read"), getEmployees)
  .post(
    authorization("employees", "Create"),
    employeePostValidation,
    createEmployee
  );
router
  .route("/:id")
  .delete(authorization("employees", "Delete"), deleteEmployee)
  .get(authorization("employees", "Read"), getEmployeeById)
  .put(authorization("employees", "Read"), employeePutValidation, updateEmployee);

export default router;
