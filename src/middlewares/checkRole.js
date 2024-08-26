import { PrismaClient } from "@prisma/client";

import { AppError } from "../utils/errorHandle.js";
import { logInfo } from "../schema/logSchema.js";
import { BAD_REQUEST, FORBIDDEN, NOT_FOUND } from "../utils/errorMessage.js";

const prisma = new PrismaClient();

async function getEmployeeFromUser(username) {
  const user = await prisma.users.findUnique({ where: { username } });
  const employee = await prisma.employees.findUnique({
    where: { employeeNumber: user.employeeNumber },
  });
  return employee;
}

async function getEmployeeNumbersInSameOffice(officeCode) {
  const employeesInSameOffice = await prisma.employees.findMany({
    where: { officeCode },
  });
  return employeesInSameOffice.map((emp) => emp.employeeNumber);
}

async function checkRoleGetAll(req, res, next) {
  const employee = await getEmployeeFromUser(req.user.username);

  if (employee.jobTitle === "President" || employee.jobTitle === "Manager") {
    return next();
  }

  if (employee.jobTitle === "Leader") {
    const employeeNumbers = await getEmployeeNumbersInSameOffice(
      employee.officeCode
    );
    const customers = await prisma.customers.findMany({
      where: {
        salesRepEmployeeNumber: employeeNumbers,
      },
    });
    logInfo(req.user.username, req.baseUrl, req.method);
    return res.json(customers);
  }

  if (employee.jobTitle === "Staff") {
    const customers = await prisma.customers.findMany({
      where: {
        salesRepEmployeeNumber: employee.employeeNumber,
      },
    });
    logInfo(req.user.username, req.baseUrl, req.method);
    return res.json(customers);
  }
}

async function checkRoleGetId(req, res, next) {
  const employee = await getEmployeeFromUser(req.user.username);
  const customer = await prisma.customers.findUnique({
    where: { customerNumber: parseInt(req.params.id) },
  });
  if (!customer) {
    return next(
      new AppError({
        message: "Customer is not found",
        ...NOT_FOUND,
      })
    );
  }

  if (employee.jobTitle === "President" || employee.jobTitle === "Manager") {
    return next();
  }

  if (employee.jobTitle === "Leader") {
    const employeeNumbers = await getEmployeeNumbersInSameOffice(
      employee.officeCode
    );
    if (!employeeNumbers.includes(customer.salesRepEmployeeNumber)) {
      return next(
        new AppError({
          message: "No access to this customer",
          ...FORBIDDEN,
        })
      );
    } else {
      return res.json(customer);
    }
  }

  if (employee.jobTitle === "Staff") {
    if (customer.salesRepEmployeeNumber !== employee.employeeNumber) {
      return next(
        new AppError({
          message: "No access to this customer",
          ...FORBIDDEN,
        })
      );
    } else {
      return next();
    }
  }
}

async function checkRoleCreate(req, res, next) {
  const employee = await getEmployeeFromUser(req.user.username);

  if (employee.jobTitle === "President" || employee.jobTitle === "Manager") {
    return next();
  }

  if (employee.jobTitle === "Leader") {
    const employeeNumbers = await getEmployeeNumbersInSameOffice(
      employee.officeCode
    );

    const customer = req.body;
    if (!employeeNumbers.includes(customer.salesRepEmployeeNumber)) {
      return next(
        new AppError({
          message: "Can not create customer with diferent employeeNumber",
          ...BAD_REQUEST,
        })
      );
    } else {
      return next();
    }
  }

  if (employee.jobTitle === "Staff") {
    const customer = req.body;
    if (customer.salesRepEmployeeNumber !== employee.employeeNumber) {
      return next(
        new AppError({
          message: "Can not create customer with diferent employeeNumber",
          ...BAD_REQUEST,
        })
      );
    } else {
      return next();
    }
  }
}

async function checkRoleUpdate(req, res, next) {
  const employee = await getEmployeeFromUser(req.user.username);
  const customer = await prisma.customers.findUnique({
    where: { customerNumber: parseInt(req.params.id) },
  });
  if (!customer) {
    return next(
      new AppError({
        message: "Customer is not found",
        ...NOT_FOUND,
      })
    );
  }

  if (employee.jobTitle === "President" || employee.jobTitle === "Manager") {
    return next();
  }

  if (employee.jobTitle === "Leader") {
    const employeeNumbers = await getEmployeeNumbersInSameOffice(
      employee.officeCode
    );

    if (!employeeNumbers.includes(customer.salesRepEmployeeNumber)) {
      return next(
        new AppError({
          message: "No access to this customer",
          ...FORBIDDEN,
        })
      );
    } else {
      return next();
    }
  }
}

async function checkRoleDelete(req, res, next) {
  const employee = await getEmployeeFromUser(req.user.username);
  const customer = await Customer.findByPk(req.params.id);

  if (!customer) {
    return next(
      new AppError({
        message: "Customer is not found",
        ...NOT_FOUND,
      })
    );
  }

  if (employee.jobTitle === "President" || employee.jobTitle === "Manager") {
    return next();
  }

  if (employee.jobTitle === "Leader") {
    const employeeNumbers = await getEmployeeNumbersInSameOffice(
      employee.officeCode
    );

    if (!employeeNumbers.includes(customer.salesRepEmployeeNumber)) {
      return next(
        new AppError({
          message: "No access to this customer",
          ...FORBIDDEN,
        })
      );
    } else {
      return next();
    }
  }
}

export {
  checkRoleCreate,
  checkRoleDelete,
  checkRoleGetAll,
  checkRoleGetId,
  checkRoleUpdate,
};
