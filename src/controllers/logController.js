import logService from "../services/logService.js";
import catchAsync from "../utils/catchAsync.js";

const updateLogLevel = catchAsync(async (req, res, next) => {
  const result = await logService.updateLogLevel(req.params.id, req.body);
  res.status(200).json(result);
});

const getLogInfo = catchAsync(async (req, res, next) => {
  const logs = await logService.getLogInfo(req.query);
  res.status(200).json(logs);
})

export default { updateLogLevel, getLogInfo };
