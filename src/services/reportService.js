import { PrismaClient } from "@prisma/client";
import { AppError } from "../utils/errorHandle.js";
import { NOT_FOUND } from "../utils/errorMessage.js";

const prisma = new PrismaClient();

const getOffice = async (officeCode) => {
  const office = await prisma.offices.findUnique({
    where: { officeCode },
  });

  if (!office) {
    throw new AppError({ message: "Office not found", ...NOT_FOUND });
  }

  return office;
};

const getEmployeesByOffice = async (officeCode) => {
  return await prisma.employees.findMany({
    where: { officeCode },
  });
};

const getCustomersByEmployee = async (employeeNumber) => {
  return await prisma.customers.findMany({
    where: { salesRepEmployeeNumber: employeeNumber },
  });
};

const getOrdersByCustomer = async (customerNumber, start_date, end_date) => {
  return await prisma.orders.findMany({
    where: {
      customerNumber,
      orderDate: {
        gte: new Date(start_date),
        lte: new Date(end_date),
      },
    },
    include: {
      orderdetails: {
        include: {
          products: {
            include: {
              productlines: true,
            },
          },
        },
      },
    },
  });
};

const calculateRevenue = (orders) => {
  let totalRevenue = 0;
  const productLineRevenues = {};

  for (const order of orders) {
    for (const detail of order.orderdetails) {
      const totalAmount = parseFloat(detail.priceEach) * detail.quantityOrdered;

      totalRevenue += totalAmount;

      const productLine = detail.products.productlines.productLine;
      productLineRevenues[productLine] =
        (productLineRevenues[productLine] || 0) + totalAmount;
    }
  }

  return { totalRevenue, productLineRevenues };
};

const generateReportForOffice = async (office, start_date, end_date) => {
  const employees = await getEmployeesByOffice(office.officeCode);

  let allCustomerNumbers = [];
  for (const employee of employees) {
    const customers = await getCustomersByEmployee(employee.employeeNumber);
    allCustomerNumbers.push(...customers.map((c) => c.customerNumber));
  }

  let report = {
    officeCode: office.officeCode,
    totalRevenue: 0,
    productLineRevenues: {},
    start_date,
    end_date,
  };

  for (const customerNumber of allCustomerNumbers) {
    const orders = await getOrdersByCustomer(
      customerNumber,
      start_date,
      end_date
    );
    const { totalRevenue, productLineRevenues } = calculateRevenue(orders);

    report.totalRevenue += totalRevenue;

    for (const [productLine, revenue] of Object.entries(productLineRevenues)) {
      report.productLineRevenues[productLine] =
        (report.productLineRevenues[productLine] || 0) + revenue;
    }
  }

  return report;
};

const getEmployee = async (employeeNumber) => {
  const employee = await prisma.employees.findUnique({
    where: { employeeNumber },
  });

  if (!employee) {
    throw new AppError({ message: "Employee not found", ...NOT_FOUND });
  }

  return employee;
};

const generateEmployeeReport = async (data) => {
  const { employeeNumber, start_date, end_date } = data;

  const employee = await getEmployee(employeeNumber);
  const customers = await getCustomersByEmployee(employee.employeeNumber);

  let report = {
    employeeNumber: employee.employeeNumber,
    totalRevenue: 0,
    start_date,
    end_date,
  };

  for (const customer of customers) {
    const orders = await getOrdersByCustomer(
      customer.customerNumber,
      start_date,
      end_date
    );
    const { totalRevenue } = calculateRevenue(orders);
    report.totalRevenue += totalRevenue;
  }

  return report;
};

const generateReport = async (data) => {
  const { start_date, end_date, officeCode, employeeNumber } = data;

  if (officeCode) {
    const office = await getOffice(officeCode);
    return await generateReportForOffice(office, start_date, end_date);
  } else if (employeeNumber) {
    return await generateEmployeeReport(data);
  } else {
    const offices = await prisma.offices.findMany();
    if (offices.length === 0) {
      throw new AppError({ message: "No offices found", ...NOT_FOUND });
    }

    return await Promise.all(
      offices.map((office) =>
        generateReportForOffice(office, start_date, end_date)
      )
    );
  }
};

export default { generateReport };
