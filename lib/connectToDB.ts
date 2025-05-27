import mongoose from "mongoose";

export const connectToUserDB = async () => {
  try {
    await mongoose
      .connect(`${process.env.USER_DATABASE_URL}`)
      .then(() => console.log("connected to User DB"));
  } catch (error) {
    console.log("Not Connected Due to error :" + error);
  }
};

export const connectToProductDB = async () => {
  try {
    await mongoose
      .connect(`${process.env.PRODUCT_DATABASE_URL}`)
      .then(() => console.log("connected to Products DB"));
  } catch (error) {
    console.log("Not Connected Due to error :" + error);
  }
};
