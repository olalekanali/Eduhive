import express from 'express';
import School from '../models/School.js';
import { protect, authorize } from '../middleware/auth.js';
const router = express.Router();

router.post('/', protect, authorize('superadmin','schooladmin'), async (req,res,next)=>{
  try{
    const school = await School.create({ ...req.body });
    res.status(201).json(school);
  }catch(err){ next(err); }
});

router.get('/', protect, authorize('superadmin','schooladmin'), async (req,res,next)=>{
  try{
    const schools = await School.find();
    res.json(schools);
  }catch(err){ next(err); }
});

export default router;
