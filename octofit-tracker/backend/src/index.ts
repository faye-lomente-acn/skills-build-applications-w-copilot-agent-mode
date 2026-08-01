import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDatabase } from './config/database.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    service: 'octofit-tracker-backend',
    port,
    database: 'octofit_db',
  });
});

async function startServer() {
  await connectDatabase();

  app.listen(port, () => {
    console.log(`OctoFit backend listening on port ${port}`);
  });
}

startServer();