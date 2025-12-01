import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import schoolRoutes from './routes/schools.js';
import studentRoutes from './routes/students.js';
import teacherRoutes from './routes/teachers.js';
import registerSuperAdmin from './routes/superAdmin.js';
import { errorHandler } from './middleware/errorHandler.js';
import { swaggerUiServe, swaggerUiSetup } from "./swagger/swagger.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/superadmin', registerSuperAdmin);

app.use("/api-docs", swaggerUiServe, swaggerUiSetup);

app.get('/', (req, res) => res.json({ ok: true, name: 'EduHive Backend' }));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`EduHive backend running on port ${PORT}`);
});
