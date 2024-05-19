import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';

export const auth = async (req:Request, res:Response) => {
}

export const registerUser = async (req:Request, res:Response) => {
  const { name, email, password }:{
    name :string,
    email:string,
    password:string
  } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User();
    user.name = name;
    user.email = email;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
