import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, unique: true },
    category: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true },
    targetMuscleGroups: [{ type: String, required: true, trim: true }],
    equipment: [{ type: String, required: true, trim: true }],
    coachTip: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Workout = model('Workout', workoutSchema);

export default Workout;