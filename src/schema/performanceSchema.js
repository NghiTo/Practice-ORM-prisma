import { Schema, model } from "mongoose";
import errorLogger from "../logger/errorLogger.js";

const performanceSchema = new Schema({
  responseTime: {
    type: Number,
    required: true,
  },
  memoryUsage: {
    type: Number,
    required: true,
  },
  endpoint: {
    type: String,
  },
  method: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Performance = model("performance", performanceSchema);

const trackPerformance = async (
  responseTime,
  memoryUsage,
  endpoint = null,
  method = null
) => {
  try {
    const performance = new Performance({
      responseTime,
      memoryUsage,
      endpoint,
      method,
    });

    await performance.save();
  } catch (error) {
    errorLogger.error(error);
  }
};

export { trackPerformance };
