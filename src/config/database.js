import pkg from "mongoose";
import dotenv from "dotenv";
import path from "path";

const { connect, connection } = pkg;

dotenv.config({ path: path.resolve("environments/.env") });

async function connectMongoDB() {
  connect(process.env.MONGODB_URL, {
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASS,
    dbName: process.env.MONGODB_NAME,
  });
  // connection.on("connected", () => {
  //   console.log("Mongoose has successfully connected to MongoDB");
  // });
}

export default connectMongoDB;
