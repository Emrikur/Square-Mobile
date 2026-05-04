import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import  {getEnv}  from './config/env';
import router from './api/routes/auth';
import axios from 'axios';

dotenv.config();

const app = express();
const env = getEnv();
const PORT = env.PORT || 5000;

app.use(cors({
  origin: env.FRONTEND_ORIGIN || 'http://localhost:5000',
  credentials: true,
}));

app.use(express.json());


app.get('/test', async (req, res) => {
  res.send({status: 'Backend is running', timestamp: new Date().toISOString()});
});



app.get('/info', async (req, res) => {

const HOST = env.FM_HOST;
const DB = env.FM_DB;
  try{

    if (!HOST || !DB) {
      console.error('FM_HOST or FM_DB is not set in environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    console.log("Here is the host: ",HOST + DB + "/sessions");

if(!env.FM_USERNAME || !env.FM_PASSWORD) {
  console.error('FM_USERNAME or FM_PASSWORD is not set in environment variables');
  return res.status(500).json({ error: 'Server configuration error' });
}
const response = await axios.post(`
  ${HOST}${DB}/sessions`,
  {}, {

  auth: {
    username: env.FM_USERNAME,
    password: env.FM_PASSWORD
  },
  headers: {
    'Content-Type': 'application/json'
  }
});
console.log("Response from FM API:", response.data);
res.send(response.data);

} catch(error){
  console.error('Error connecting to FM API:', error);
  res.status(500).json({ error: 'Failed to connect to FM API' });

}
})








app.use('/auth', router);

app.use((err:Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error'})
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`CORS enabled for frontend: ${env.FRONTEND_ORIGIN || 'http://localhost:5173'}`);
});
