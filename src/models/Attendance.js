import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const attendanceSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['present','absent','late'], default: 'present' },
  class: { type: Schema.Types.ObjectId, ref: 'Class' },
  school: { type: Schema.Types.ObjectId, ref: 'School' }
}, { timestamps: true });

export default model('Attendance', attendanceSchema);
