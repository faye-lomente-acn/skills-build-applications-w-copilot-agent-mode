import { Router } from 'express';
import { getApiBaseUrl } from '../config/api.js';
import Leaderboard from '../models/Leaderboard.js';

const router = Router();

router.get('/', async (_request, response) => {
  const leaderboard = await Leaderboard.find().sort({ createdAt: -1 }).lean();

  response.json({
    resource: 'leaderboard',
    endpoint: `${getApiBaseUrl()}/api/leaderboard`,
    count: leaderboard.length,
    data: leaderboard,
  });
});

export default router;