import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const registerSuperAdmin = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password)
      return res.status(400).json({ error: 'Missing fields' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already in use' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      email,
      password: hashed,
      role: 'superadmin',
    });

    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};
