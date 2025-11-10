import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const classSchema = new Schema({
  name: { type: String, required: true },
  academicYear: { type: String },
  school: { type: Schema.Types.ObjectId, ref: 'School', required: true }
}, { timestamps: true });

export default model('Class', classSchema);
