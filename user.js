import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      min: 5,
      max: 10,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models?.User || mongoose.model("User", userSchema);
export default User;
