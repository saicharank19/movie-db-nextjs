import mongoose from "mongoose";

let isConnected: boolean = false;

const connectToDb = async () => {
  if (isConnected) {
    console.log("already connected");
    return;
  }
  try {
    console.log(process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI as string);

    isConnected = true;

    console.log("Connected to db");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDb;
