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

router.get('/', protect, authorize('superadmin','schooladmin'), async (req, res, next) => {
  try {
    let schools;
    if (req.user.role === 'superadmin') {
      // superadmin sees all schools
      schools = await School.find();
    } else {
      // schooladmin sees only their school
      schools = await School.find({ _id: req.user.school });
    }
    res.json(schools);
  } catch (err) {
    next(err);
  }
});
router.get('/:id', protect, authorize('superadmin','schooladmin'), async (req, res, next) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) return res.status(404).json({ error: 'School not found' });

    // schooladmin can only access their own school
    if (req.user.role === 'schooladmin' && school._id.toString() !== req.user.school) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(school);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', protect, authorize('superadmin','schooladmin'), async (req, res, next) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) return res.status(404).json({ error: 'School not found' });

    // schooladmin can only update their own school
    if (req.user.role === 'schooladmin' && school._id.toString() !== req.user.school) {
      return res.status(403).json({ error: 'Access denied' });
    }

    Object.assign(school, req.body);
    await school.save();
    res.json(school);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', protect, authorize('superadmin'), async (req, res, next) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) return res.status(404).json({ error: 'School not found' });

    await school.remove();
    res.json({ message: 'School deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
