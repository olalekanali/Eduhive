import express from 'express';
import { registerSchool, login } from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * /auth/register-school:
 *   post:
 *     summary: Register a new school + school admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               schoolName:
 *                 type: string
 *               ownerName:
 *                 type: string
 *               ownerEmail:
 *                 type: string
 *               ownerPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: School + Admin created
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login as schooladmin, teacher, or superadmin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */

router.post('/register-school', registerSchool);
router.post('/login', login);

export default router;
