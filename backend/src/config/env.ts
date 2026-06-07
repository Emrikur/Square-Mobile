export const getEnv = () => ({
  DATABASE_URL: process.env.URL_DATABASE,
  FM_API_KEY: process.env.FM_API_KEY,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
});
