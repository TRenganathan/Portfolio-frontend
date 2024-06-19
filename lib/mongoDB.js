import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    // return await mongoose.connect(process.env.MONGODB_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    console.log("CONNECTED TO MONGO DB");
  } catch (error) {
    console.log("ERROR ON MONGO DB CONNECTION", error);
  }
};
