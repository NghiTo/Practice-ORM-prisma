import { trackPerformance } from "../schema/performanceSchema.js";

const checkPerformance = (req, res, next) => {
  const startHrTime = process.hrtime();
  res.on("finish", () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
    trackPerformance(
      elapsedTimeInMs,
      process.memoryUsage().heapUsed / 1024 / 1024,
      req.originalUrl,
      req.method
    );
  });
  next();
};

export default checkPerformance;
