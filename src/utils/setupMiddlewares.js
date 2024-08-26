import cors from "cors";
import cookieParser from "cookie-parser";
import { json } from "express";
import { serve, setup } from "swagger-ui-express";

import { AppError, globalErrorHandler } from "./errorHandle.js";
import swaggerDocument from "./swagger.js";
import requestLogger from "../logger/requestLogger.js";
import routes from "../routes/index.js";
import { NOT_FOUND } from "./errorMessage.js";
import checkPerformance from "../middlewares/checkPerformance.js";

function setupMiddlewares(app) {
  app.use(cors());
  app.use("/api-docs", serve, setup(swaggerDocument));
  app.use(requestLogger);
  app.use(cookieParser());
  app.use(json());
  app.use(checkPerformance);
  app.use("/api", routes);
  app.all("*", (req, res, next) => {
    next(
      new AppError({
        message: `Can't find ${req.originalUrl} on this server`,
        ...NOT_FOUND,
      })
    );
  });
  app.use(globalErrorHandler);
}

export default setupMiddlewares;
