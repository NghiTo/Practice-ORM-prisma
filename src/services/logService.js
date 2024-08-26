import { model } from "mongoose";
import { logSchema } from "../schema/logSchema.js";
import { AppError } from "../utils/errorHandle.js";
import { NOT_FOUND } from "../utils/errorMessage.js";

const Log = model("log", logSchema);

const updateLogLevel = async (id, { level }) => {
  const foundLog = await Log.findByIdAndUpdate(id, { level }, { new: true });

  if (!foundLog) {
    throw new AppError({ message: "Log not found", ...NOT_FOUND });
  }

  return { message: "Log updated successfully" };
};

const getLogInfo = async ({ level, user, startTime, endTime, content }) => {
  const filter = {};

  if (level) filter.level = level;
  if (user) filter.user = user;
  if (startTime || endTime) {
    filter.createdAt = {
      ...(startTime && { $gte: new Date(startTime) }),
      ...(endTime && { $lte: new Date(endTime) }),
    };
  }
  if (content) {
    filter.message = { $regex: content, $options: "i" };
  }

  return await Log.find(filter);
};

export default { updateLogLevel, getLogInfo };
