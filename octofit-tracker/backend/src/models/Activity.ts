import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    workout: { type: Schema.Types.ObjectId, ref: 'Workout', required: true },
    activityType: { type: String, required: true, trim: true },
    performedAt: { type: Date, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    notes: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

const Activity = model('Activity', activitySchema);

export default Activity;