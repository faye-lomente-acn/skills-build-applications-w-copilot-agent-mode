import { Schema, model } from 'mongoose';

const standingSchema = new Schema(
  {
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    teamName: { type: String, required: true, trim: true },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
    streakDays: { type: Number, required: true },
  },
  { _id: false }
);

const leaderboardSchema = new Schema(
  {
    periodLabel: { type: String, required: true, trim: true },
    updatedAtLabel: { type: String, required: true, trim: true },
    standings: [standingSchema],
  },
  { timestamps: true }
);

const Leaderboard = model('Leaderboard', leaderboardSchema);

export default Leaderboard;