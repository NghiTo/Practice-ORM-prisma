import { Schema, model } from "mongoose";

import errorLogger from "../logger/errorLogger.js";

const logSchema = new Schema({
  level: {
    type: String,
    enum: ["Info", "Warning", "Error"],
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Log = model("log", logSchema);

const logToMongoDB = async (level, user, message) => {
  try {
    const log = new Log({
      level,
      user,
      message,
    });

    await log.save();
  } catch (error) {
    errorLogger.error(error);
  }
};

const logInfo = (username, url, method) => {
  logToMongoDB(
    "Info",
    username || "Unknown User",
    `Request made to ${url} with method ${method}`
  );
};

const logWarning = (username, message) => {
  logToMongoDB("Warning", username || "Unknown User", message);
};

const logError = (username, errorMessage) => {
  logToMongoDB("Error", username || "Unknown User", errorMessage);
};

export { logSchema, logInfo, logWarning, logError };
