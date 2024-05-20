import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
<<<<<<< HEAD:controllers/auth.controller.js
import User from '../Models/user.model.js';
export const auth = async (req, res) => {
}

export const registerUser = async (req, res) => {
    const { username, password, email } = req.body;
=======
import User from '../models/userModel';

export const auth = async (req:Request, res:Response) => {
}

export const registerUser = async (req:Request, res:Response) => {
  const { name, email, password }:{
    name :string,
    email:string,
    password:string
  } = req.body;

>>>>>>> 369533486213821b186c71915641c4bc29cb6ef4:src/controllers/authController.ts
  try {
    console.log(`Checking if user exists with email: ${email}`);
    let user = await User.findOne({ email });
    console.log(`User found: ${user}`);
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    user = new User({
      username,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
<<<<<<< HEAD:controllers/auth.controller.js
    console.log(user);
    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
=======
    await user.save();
>>>>>>> 369533486213821b186c71915641c4bc29cb6ef4:src/controllers/authController.ts
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};