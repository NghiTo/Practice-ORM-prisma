import express from "express";
import dotenv from "dotenv";
import path from "path";

import connectMongoDB from "./config/database.js";
import setupMiddlewares from "./utils/setupMiddlewares.js";

dotenv.config({path: path.resolve("environments/.env")});
const PORT = process.env.PORT;
const app = express();

setupMiddlewares(app);
connectMongoDB();

app.listen(PORT);
