import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';
import { connectDatabase } from '../config/database.js';

dotenv.config();

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const workouts = await Workout.insertMany([
      {
        title: 'Harbor Sunrise Run',
        category: 'Cardio',
        difficulty: 'Intermediate',
        durationMinutes: 35,
        targetMuscleGroups: ['Legs', 'Core'],
        equipment: ['Running shoes', 'Fitness watch'],
        coachTip: 'Keep the first 10 minutes conversational, then negative split the second half.',
      },
      {
        title: 'Dockside Strength Circuit',
        category: 'Strength',
        difficulty: 'Advanced',
        durationMinutes: 45,
        targetMuscleGroups: ['Back', 'Shoulders', 'Glutes'],
        equipment: ['Kettlebell', 'Resistance bands'],
        coachTip: 'Drive through your heels and keep your ribcage stacked on every pull.',
      },
      {
        title: 'Mobility Reset Flow',
        category: 'Mobility',
        difficulty: 'Beginner',
        durationMinutes: 20,
        targetMuscleGroups: ['Hips', 'Hamstrings', 'Thoracic spine'],
        equipment: ['Yoga mat'],
        coachTip: 'Pause at each end range and let the breath slow the movement down.',
      },
      {
        title: 'Lunchtime Power Ride',
        category: 'Cycling',
        difficulty: 'Intermediate',
        durationMinutes: 50,
        targetMuscleGroups: ['Quads', 'Calves', 'Cardiovascular system'],
        equipment: ['Spin bike', 'Towel'],
        coachTip: 'Push cadence during the fast blocks, then recover with deep nasal breaths.',
      },
    ]);

    const users = await User.insertMany([
      {
        name: 'Maya Chen',
        email: 'maya.chen@octofit.app',
        role: 'Team Captain',
        fitnessLevel: 'Advanced',
        streakDays: 18,
        points: 940,
      },
      {
        name: 'Jordan Alvarez',
        email: 'jordan.alvarez@octofit.app',
        role: 'Athlete',
        fitnessLevel: 'Intermediate',
        streakDays: 11,
        points: 780,
      },
      {
        name: 'Priya Raman',
        email: 'priya.raman@octofit.app',
        role: 'Team Captain',
        fitnessLevel: 'Advanced',
        streakDays: 21,
        points: 1025,
      },
      {
        name: 'Ethan Brooks',
        email: 'ethan.brooks@octofit.app',
        role: 'Athlete',
        fitnessLevel: 'Beginner',
        streakDays: 6,
        points: 420,
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Pulse Runners',
        city: 'Seattle',
        focus: 'Endurance and recovery balance',
        captain: users[0]._id,
        members: [users[0]._id, users[1]._id],
        points: 1720,
      },
      {
        name: 'Summit Lifters',
        city: 'Denver',
        focus: 'Strength progression and consistency',
        captain: users[2]._id,
        members: [users[2]._id, users[3]._id],
        points: 1445,
      },
    ]);

    await Promise.all([
      User.updateOne({ _id: users[0]._id }, { team: teams[0]._id }),
      User.updateOne({ _id: users[1]._id }, { team: teams[0]._id }),
      User.updateOne({ _id: users[2]._id }, { team: teams[1]._id }),
      User.updateOne({ _id: users[3]._id }, { team: teams[1]._id }),
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        team: teams[0]._id,
        workout: workouts[0]._id,
        activityType: 'Run',
        performedAt: new Date('2026-07-31T06:15:00.000Z'),
        durationMinutes: 36,
        caloriesBurned: 412,
        notes: 'Maintained tempo pace for the last 12 minutes along the waterfront.',
      },
      {
        user: users[1]._id,
        team: teams[0]._id,
        workout: workouts[2]._id,
        activityType: 'Mobility',
        performedAt: new Date('2026-07-31T19:10:00.000Z'),
        durationMinutes: 22,
        caloriesBurned: 108,
        notes: 'Focused on hip opening after a heavy training week.',
      },
      {
        user: users[2]._id,
        team: teams[1]._id,
        workout: workouts[1]._id,
        activityType: 'Strength Circuit',
        performedAt: new Date('2026-07-30T12:05:00.000Z'),
        durationMinutes: 47,
        caloriesBurned: 505,
        notes: 'Added one extra kettlebell round without breaking form.',
      },
      {
        user: users[3]._id,
        team: teams[1]._id,
        workout: workouts[3]._id,
        activityType: 'Ride',
        performedAt: new Date('2026-07-29T17:45:00.000Z'),
        durationMinutes: 49,
        caloriesBurned: 468,
        notes: 'Improved cadence control during the interval blocks.',
      },
      {
        user: users[0]._id,
        team: teams[0]._id,
        workout: workouts[1]._id,
        activityType: 'Strength Circuit',
        performedAt: new Date('2026-07-28T07:20:00.000Z'),
        durationMinutes: 44,
        caloriesBurned: 486,
        notes: 'Stayed smooth on pulls and lunges, finishing every station on time.',
      },
    ]);

    await Leaderboard.insertMany([
      {
        periodLabel: 'Weekly Team Challenge',
        updatedAtLabel: 'Updated August 1, 2026 at 09:00 UTC',
        standings: [
          {
            team: teams[0]._id,
            teamName: 'Pulse Runners',
            score: 1720,
            rank: 1,
            streakDays: 18,
          },
          {
            team: teams[1]._id,
            teamName: 'Summit Lifters',
            score: 1445,
            rank: 2,
            streakDays: 21,
          },
        ],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
