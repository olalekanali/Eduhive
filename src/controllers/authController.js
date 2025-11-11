import User from '../models/User.js';
import School from '../models/School.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/*
  Minimal auth controller:
  - registerSchool: creates a school and a schooladmin user
  - login: validates email/password and returns JWT
*/

export const registerSchool = async (req, res, next) => {
  try {
    const { schoolName, ownerName, ownerEmail, ownerPassword } = req.body;
    if (!schoolName || !ownerName || !ownerEmail || !ownerPassword) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if school alreeady exists
    const existing = await User.findOne({ email: ownerEmail });
    if (existing) return res.status(400).json({ error: 'Email already in use' });

    // create admin user
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(ownerPassword, salt);
    const user = await User.create({
      fullName: ownerName,
      email: ownerEmail,
      password: hashed,
      role: 'schooladmin'
    });

    const school = await School.create({
      name: schoolName,
      owner: user.fullName
    });

    user.school = school._id;
    await user.save();

    res.status(201).json({ school, user });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
      .select('+password')
      .populate('school'); // ✅ populate school info

    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const payload = { 
      id: user._id, 
      role: user.role, 
      school: user.school?._id 
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
        school: user.school ? {
          id: user.school._id,
          name: user.school.name,
          owner: user.school.owner,
          createdAt: user.school.createdAt
        } : null
      }
    });

  } catch (err) {
    next(err);
  }
};
