import { Router } from "express";
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";
import {
  checkRoleCreate,
  checkRoleDelete,
  checkRoleGetAll,
  checkRoleGetId,
  checkRoleUpdate,
} from "../middlewares/checkRole.js";
import authorization from "../auth/authorize.js";
import {
  customerPostValidation,
  customerPutValidation,
} from "../validators/customerValidator.js";

const router = Router();

router
  .route("/")
  .get(authorization("customers", "Read"), checkRoleGetAll, getCustomers)
  .post(
    authorization("customers", "Create"),
    checkRoleCreate,
    customerPostValidation,
    createCustomer
  );

router
  .route("/:id")
  .get(authorization("customers", "Read"), checkRoleGetId, getCustomerById)
  .delete(authorization("customers", "Delete"), checkRoleDelete, deleteCustomer)
  .put(
    authorization("customers", "Update"),
    checkRoleUpdate,
    customerPutValidation,
    updateCustomer
  );

export default router;
