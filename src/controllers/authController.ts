import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';
export const auth = async (req: Request, res: Response) => {
}

export const registerUser = async (req: Request, res: Response) => {
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



export const loginUser = async (req: Request, res: Response) => {
   const { username, password ,email} = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid  or password' });
    }
    if (!user.password || typeof user.password !== 'string') {
      return res.status(400).json({ message: 'Invalid string or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid  password' });
    }

    const token = jwt.sign({ userId: user._id,username: user.username , email: user.email} , SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
};

export const forgetPassword = async (req: Request, res: Response) => {
  const { username, newPassword ,email} = req.body;
   try {
    const user = await User.findOne({ username, email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or email' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Server error');
  }
};
