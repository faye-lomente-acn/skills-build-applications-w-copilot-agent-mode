import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    role: { type: String, required: true, trim: true },
    fitnessLevel: { type: String, required: true, trim: true },
    streakDays: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

export default User;