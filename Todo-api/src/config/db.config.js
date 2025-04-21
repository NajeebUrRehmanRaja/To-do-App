import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "NoteAble",
    });
    console.log("Connected to Mongodb");
  } catch (error) {
    console.log("Error Conecting to Mongodb", error);
    process.exit(1);
  }
};

export default connectDB;
