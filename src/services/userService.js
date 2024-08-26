import { hash, compare } from "bcrypt";
import pkg from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

import { AppError } from "../utils/errorHandle.js";
import { BAD_REQUEST } from "../utils/errorMessage.js";

const prisma = new PrismaClient();
const { sign } = pkg;

const createUser = async ({ username, password, employeeNumber }) => {
  const hashedPassword = await hash(password, 12);
  const employee = await prisma.employees.findUnique({
    where: {
      employeeNumber: employeeNumber,
    },
  });
  if (!employee) {
    throw new AppError({
      message: "Employee number is not valid",
      ...BAD_REQUEST,
    });
  }

  await prisma.users.create({
    data: {
      username,
      password: hashedPassword,
      employeeNumber,
    },
  });
  return { message: "User is created successfully" };
};

const loginUser = async ({ username, password }) => {
  const user = await prisma.users.findUnique({ where: { username } });

  if (!user) {
    throw new AppError({
      message: "Wrong username or password",
      ...BAD_REQUEST,
    });
  }

  const isMatch = await compare(password, user.password);

  if (!isMatch) {
    throw new AppError({
      message: "Wrong username or password",
      ...BAD_REQUEST,
    });
  }

  const token = sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};

export default {
  createUser,
  loginUser,
};
