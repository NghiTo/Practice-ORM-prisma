import catchAsync from "../utils/catchAsync.js";
import reportService from "../services/reportService.js";

const generateReport = catchAsync(async (req, res, next) => {
  const report = await reportService.generateReport(req.query);
  res.status(200).json(report);
});


export { generateReport };
