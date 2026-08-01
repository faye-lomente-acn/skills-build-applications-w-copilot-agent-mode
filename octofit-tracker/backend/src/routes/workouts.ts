import { Router } from 'express';
import { getApiBaseUrl } from '../config/api.js';
import Workout from '../models/Workout.js';

const router = Router();

router.get('/', async (_request, response) => {
  const workouts = await Workout.find().sort({ difficulty: 1, durationMinutes: 1 }).lean();

  response.json({
    resource: 'workouts',
    endpoint: `${getApiBaseUrl()}/api/workouts`,
    count: workouts.length,
    data: workouts,
  });
});

export default router;