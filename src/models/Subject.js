import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const subjectSchema = new Schema({
  name: { type: String, required: true },
  class: { type: Schema.Types.ObjectId, ref: 'Class' },
  teacher: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default model('Subject', subjectSchema);
