import { PrismaClient } from "@prisma/client";

import { AppError } from "../utils/errorHandle.js";
import { BAD_REQUEST, FORBIDDEN, NOT_FOUND } from "../utils/errorMessage.js";

const prisma = new PrismaClient();

const createEmployee = async (data) => {
  const office = await prisma.offices.findUnique({
    where: { officeCode: data.officeCode },
  });
  const employeeNumbers = (await prisma.employees.findMany()).map(
    (emp) => emp.employeeNumber
  );

  if (data.employeeNumber && employeeNumbers.includes(data.employeeNumber)) {
    throw new AppError({
      message: "Employee number is invalid",
      ...BAD_REQUEST,
    });
  }
  if (!office) {
    throw new AppError({ message: "Office is not found", ...NOT_FOUND });
  }
  if (data.customers) {
    await prisma.employees.create({
      data: {
        ...data,
        customers: {
          create: data.customers,
        },
      },
    });

    return {
      message: "Employee and associated customers are created successfully.",
    };
  } else {
    await prisma.employees.create({ data });
    return { message: "Employee is created successfully." };
  }
};

const getEmployees = async () => {
  return await prisma.employees.findMany();
};

const getEmployeeById = async (id) => {
  const employee = await prisma.employees.findUnique({
    where: {
      employeeNumber: parseInt(id),
    },
  });

  if (!employee) {
    throw new AppError({ message: "Employee is not found", ...NOT_FOUND });
  }
  return employee;
};

const deleteEmployee = async (id) => {
  const employee = await prisma.employees.findUnique({
    where: {
      employeeNumber: parseInt(id),
    },
  });

  if (!employee) {
    throw new AppError({ message: "Employee is not found", ...NOT_FOUND });
  } else if (employee.lastName === "9999") {
    throw new AppError({
      message: "Cannot delete default employee",
      ...FORBIDDEN,
    });
  }
  const customers = await prisma.customers.findMany({
    where: { salesRepEmployeeNumber: employee.employeeNumber },
  });
  if (customers) {
    const defaultEmployee = await prisma.employees.findFirst({
      where: {
        lastName: "9999",
        officeCode: employee.officeCode,
      },
    });
    await prisma.customers.updateMany({
      data: { salesRepEmployeeNumber: defaultEmployee.employeeNumber },
      where: { salesRepEmployeeNumber: employee.employeeNumber },
    });
  }

  await prisma.employees.delete({
    where: {
      employeeNumber: parseInt(id),
    },
  });
  return { message: "Employee is deleted successfully" };
};

const updateEmployee = async (id, data) => {
  const employee = await prisma.employees.findUnique({
    where: {
      employeeNumber: parseInt(id),
    },
  });

  if (!employee) {
    throw new AppError({
      message: "Employee is not found",
      ...NOT_FOUND,
    });
  }

  await prisma.employees.update({
    data,
    where: {
      employeeNumber: parseInt(id),
    },
  });
  return { message: "Employee is updated successfully" };
};

export default {
  createEmployee,
  getEmployees,
  getEmployeeById,
  deleteEmployee,
  updateEmployee,
};
