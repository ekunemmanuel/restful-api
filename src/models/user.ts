import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

// Apply the uniqueValidator plugin to userSchema.
// userSchema.plugin(uniqueValidator, {
//   message: "Error, expected {PATH} to be unique.",
// });

export default mongoose.model("User", userSchema);
