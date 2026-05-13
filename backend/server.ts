import 'dotenv/config';
import express from 'express';
import {Request, Response, NextFunction} from "express"
import cors from 'cors';
import { getEnv }  from './src/config/env';
import router from './src/api/routes/auth';
import graphRoutes from "./src/api/routes/graphRoutes"
import modalRoute from "./src/api/routes/modalRoute"


const env = getEnv();

const app = express();
const PORT = env.PORT || 5000;

app.use(cors({
  origin: env.FRONTEND_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

app.use("/dashboard/graph", graphRoutes)
app.use("/modal", modalRoute)


app.use('/auth', router);

app.use((err:Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error'})
  next()
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`CORS enabled for frontend: ${env.FRONTEND_ORIGIN || 'http://localhost:5173'}`);
});
