import pg from 'pg';
import {getEnv} from './config/env'

const env = getEnv()
const { Pool } = pg

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export default pool;
