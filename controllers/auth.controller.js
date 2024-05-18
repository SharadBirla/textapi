import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Models/user.model.js';

export const auth = async (req, res) => {
}

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

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
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
