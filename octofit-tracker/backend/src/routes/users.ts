import { Router } from 'express';
import { getApiBaseUrl } from '../config/api.js';
import User from '../models/User.js';

const router = Router();

router.get('/', async (_request, response) => {
  const users = await User.find().sort({ points: -1, name: 1 }).lean();

  response.json({
    resource: 'users',
    endpoint: `${getApiBaseUrl()}/api/users`,
    count: users.length,
    data: users,
  });
});

export default router;