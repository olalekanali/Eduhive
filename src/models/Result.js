import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const resultSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
  score: { type: Number, required: true },
  term: { type: String },
  school: { type: Schema.Types.ObjectId, ref: 'School' }
}, { timestamps: true });

export default model('Result', resultSchema);
