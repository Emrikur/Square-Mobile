import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { env } from './config/env';
import router from './api/routes/auth';

dotenv.config();

const app = express();
const PORT = env.PORT || 5000;

app.use(cors({
  origin: env.FRONTEND_ORIGIN || 'http://localhost:5000',
  credentials: true,
}));

app.use(express.json());


app.get('/test', (req, res) => {
  res.send({status: 'Backend is running', timestamp: new Date().toISOString()});
});



app.use('/auth', router);

app.use((err:Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error'})
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`CORS enabled for frontend: ${env.FRONTEND_ORIGIN || 'http://localhost:5173'}`);
});
