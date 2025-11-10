import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const schoolSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  logo: { type: String },
  settings: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default model('School', schoolSchema);
