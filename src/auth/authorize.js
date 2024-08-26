import { PrismaClient } from "@prisma/client";

import { AppError } from "../utils/errorHandle.js";
import { FORBIDDEN, UNAUTHORIZED } from "../utils/errorMessage.js";

const prisma = new PrismaClient();

const authorization = (resource, action) => {
  return async (req, res, next) => {
    const user = await prisma.users.findUnique({
      where: { username: req.user.username },
    });

    if (!user) {
      return next(new AppError({ message: "Please log in", ...UNAUTHORIZED }));
    }

    const employee = await prisma.employees.findUnique({
      where: { employeeNumber: user.employeeNumber },
    });
    const jobTitle = employee.jobTitle;

    const permission = {
      President: {
        employees: ["Read", "Create", "Update", "Delete"],
        customers: ["Read", "Create", "Update", "Delete"],
        offices: ["Create"],
      },
      Manage: {
        employees: ["Read", "Create", "Update"],
        customers: ["Read", "Create", "Update", "Delete"],
      },
      Leader: {
        employees: ["Read"],
        customers: ["Read", "Create", "Update", "Delete"],
      },
      Staff: {
        employees: [],
        customers: ["Read", "Create"],
      },
    };

    const allowActions = permission[jobTitle]?.[resource];

    if (allowActions.includes(action)) {
      next();
    } else {
      next(new AppError({message: "No permission to access this data", ...FORBIDDEN}));
    }
  };
};

export default authorization;
