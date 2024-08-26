import { PrismaClient } from "@prisma/client";

import { AppError } from "../utils/errorHandle.js";
import { BAD_REQUEST } from "../utils/errorMessage.js";

const prisma = new PrismaClient();

const createOffice = async (data) => {
  const officeCodes = (await prisma.offices.findMany()).map(
    (off) => off.officeCode
  );
  if (officeCodes.includes(data.officeCode)) {
    throw new AppError({ message: "Office code is invalid", ...BAD_REQUEST });
  }

  await prisma.offices.create({
    data: {
      ...data,
      employees: {
        create: {
          lastName: "9999",
          firstName: "Caitlyn",
          extension: "k564",
          email: "toanhduc@gmail.com",
          jobTitle: "Staff",
        },
      },
    },
  });

  return { message: "Office is created successfully" };
};

export default { createOffice };
