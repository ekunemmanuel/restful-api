import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI ?? "mongodb://localhost/mydatabase"
    );
    console.log("MongoDB connected");
  } catch (err: any) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB
