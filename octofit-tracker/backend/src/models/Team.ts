import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    city: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    captain: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    points: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Team = model('Team', teamSchema);

export default Team;