import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: { type: String, require: [true, "Please enter user name"] },
    emailId: { type: String, require: [true, "Please enter emailId"] },
    password: { type: String, require: [true, "Please enter password"] },
  },
  { timestamps: true }
);

export const User =mongoose.model("User",UserSchema);
