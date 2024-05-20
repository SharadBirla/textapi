import bcrypt from 'bcryptjs';
import User from '../Models/user.model.js';
export const auth = async (req, res) => {
}

export const registerUser = async (req, res) => {
    const { username, password, email } = req.body;
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
    console.error(err.message);
    res.status(500).send('Server error');
  }
};