import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';

export const auth = async (req:Request, res:Response) => {
}

export const registerUser = async (req:Request, res:Response) => {
  const { username, email, password }:{
    username :string,
    email:string,
    password:string
  } = req.body;

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
    console.log(user);
    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};