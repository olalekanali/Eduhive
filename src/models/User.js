import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, index: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['superadmin', 'schooladmin', 'teacher', 'student'], default: 'student' },
  school: { type: Schema.Types.ObjectId, ref: 'School' },
  profilePhoto: { type: String },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default model('User', userSchema);
