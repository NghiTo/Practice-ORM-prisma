import employeeService from "../services/employeeService.js";
import catchAsync from "../utils/catchAsync.js";
import { logInfo } from "../schema/logSchema.js";

const createEmployee = catchAsync(async (req, res, next) => {
  const result = await employeeService.createEmployee(req.body);
  res.status(200).json(result);
});

const getEmployees = catchAsync(async (req, res, next) => {
  const employees = await employeeService.getEmployees();
  logInfo(req.user.username, req.baseUrl, req.method);
  res.status(200).json(employees);
});

const getEmployeeById = catchAsync(async (req, res, next) => {
  const employee = await employeeService.getEmployeeById(req.params.id);
  logInfo(req.user.username, req.baseUrl, req.method);
  res.status(200).json(employee);
});

const deleteEmployee = catchAsync(async (req, res, next) => {
  const result = await employeeService.deleteEmployee(req.params.id);
  logInfo(req.user.username, req.baseUrl, req.method);
  res.status(200).json(result);
});

const updateEmployee = catchAsync(async (req, res, next) => {
  const result = await employeeService.updateEmployee(req.params.id, req.body);
  logInfo(req.user.username, req.baseUrl, req.method);
  res.status(200).json(result);
});

export {
  createEmployee,
  getEmployees,
  getEmployeeById,
  deleteEmployee,
  updateEmployee,
};
