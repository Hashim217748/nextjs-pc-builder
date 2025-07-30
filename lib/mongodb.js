"use server";
import mongoose from "mongoose";

const { MONGO_DB_URL, DB_NAME } = process.env;
export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGO_DB_URL + DB_NAME);
    if (connection.readyState === 1) {
      console.log("Connected to MongoDB");
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
