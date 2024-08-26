import { PrismaClient } from "@prisma/client";

import { AppError } from "../utils/errorHandle.js";
import { BAD_REQUEST, NOT_FOUND } from "../utils/errorMessage.js";

const prisma = new PrismaClient();

const createCustomer = async (data) => {
  const employee = await prisma.employees.findUnique({
    where: {
      employeeNumber: data.salesRepEmployeeNumber,
    },
  });
  const customerNumbers = (await prisma.customers.findMany()).map(
    (cus) => cus.customerNumber
  );

  if (data.customerNumber && customerNumbers.includes(data.customerNumber)) {
    throw new AppError({
      message: "Customer number is invalid",
      ...BAD_REQUEST,
    });
  }

  if (!employee) {
    throw new AppError({
      message: "saleRepEmployeeNumber is not valid",
      ...BAD_REQUEST,
    });
  }

  await prisma.customers.create({ data });
  return { message: "Customer is created successfully" };
};

const getCustomers = async () => {
  return await prisma.customers.findMany();
};

const deleteCustomer = async (id) => {
  const customer = await prisma.customers.findUnique({
    where: {
      customerNumber: parseInt(id),
    },
  });

  if (!customer) {
    throw new AppError({
      message: "Customer is not found",
      ...NOT_FOUND,
    });
  }

  await prisma.customers.delete({
    where: {
      customerNumber: parseInt(id),
    },
  });
  return { message: "Customer is deleted succesfully" };
};

const getCustomerById = async (id) => {
  const customer = await prisma.customers.findUnique({
    where: {
      customerNumber: parseInt(id),
    },
  });

  if (!customer) {
    throw new AppError({
      message: "Customer is not found",
      ...NOT_FOUND,
    });
  }

  return customer;
};

const updateCustomer = async (id, data) => {
  const customer = await prisma.customers.findUnique({
    where: {
      customerNumber: parseInt(id),
    },
  });

  if (!customer) {
    throw new AppError({
      message: "Customer is not found",
      ...NOT_FOUND,
    });
  }

  const employee = await prisma.employees.findUnique({
    where: {
      employeeNumber: data.salesRepEmployeeNumber,
    },
  });

  if (!employee) {
    throw new AppError({
      message: "saleRepEmployeeNumber is not valid",
      ...BAD_REQUEST,
    });
  }

  await prisma.customers.update({
    data,
    where: {
      customerNumber: parseInt(id),
    },
  });
  return { message: "Customer is updated succesfully" };
};

export default {
  createCustomer,
  getCustomers,
  deleteCustomer,
  getCustomerById,
  updateCustomer,
};
