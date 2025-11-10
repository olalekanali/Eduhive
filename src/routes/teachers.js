import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import User from '../models/User.js';
const router = express.Router();

router.get('/', protect, authorize('schooladmin','teacher'), async (req,res,next)=>{
  try{
    const teachers = await User.find({ school: req.user.school, role: 'teacher' });
    res.json(teachers);
  }catch(err){ next(err); }
});

router.post('/', protect, authorize('schooladmin'), async (req,res,next)=>{
  try{
    const { fullName, email, password } = req.body;
    const bcrypt = await import('bcrypt');
    const salt = await bcrypt.default.genSalt(10);
    const hashed = await bcrypt.default.hash(password || 'changeme', salt);
    const user = await User.create({ fullName, email, password: hashed, role: 'teacher', school: req.user.school });
    res.status(201).json(user);
  }catch(err){ next(err); }
});

export default router;
