import { Router } from 'express';
import { getApiBaseUrl } from '../config/api.js';
import Activity from '../models/Activity.js';

const router = Router();

router.get('/', async (_request, response) => {
  const activities = await Activity.find().sort({ performedAt: -1 }).lean();

  response.json({
    resource: 'activities',
    endpoint: `${getApiBaseUrl()}/api/activities/`,
    count: activities.length,
    data: activities,
  });
});

export default router;