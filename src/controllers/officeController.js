import officeService from "../services/officeService.js";
import catchAsync from "../utils/catchAsync.js";

const createOffice = catchAsync(async (req, res, next) => {
  const result = await officeService.createOffice(req.body);
  res.status(200).json(result);
});

export default { createOffice };
