import { Router } from 'express';
import { getApiBaseUrl } from '../config/api.js';
import Team from '../models/Team.js';

const router = Router();

router.get('/', async (_request, response) => {
  const teams = await Team.find().sort({ points: -1, name: 1 }).lean();

  response.json({
    resource: 'teams',
    endpoint: `${getApiBaseUrl()}/api/teams`,
    count: teams.length,
    data: teams,
  });
});

export default router;