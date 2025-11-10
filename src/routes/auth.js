import express from 'express';
import { registerSchool, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register-school', registerSchool);
router.post('/login', login);

export default router;
