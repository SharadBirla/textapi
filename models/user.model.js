import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: { type: String, require: [true, "Please enter user name"] },
    email: { type: String, require: [true, "Please enter email"] },
    password: { type: String, require: [true, "Please enter password"] },
  },
  { timestamps: true }
);

const User = mongoose.model("User",UserSchema);

export default User;