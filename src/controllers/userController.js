import userService from "../services/userService.js";
import catchAsync from "../utils/catchAsync.js";

const createUser = catchAsync(async (req, res, next) => {
  const result = await userService.createUser(req.body);
  res.status(200).json(result);
});

const login = catchAsync(async (req, res, next) => {
  const token = await userService.loginUser(req.body);
  res.cookie("token", token, { httpOnly: true, secure: true });
  res.json({ message: "Login successfully", token: token });
});

export { createUser, login };
