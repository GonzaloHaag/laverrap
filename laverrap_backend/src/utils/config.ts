const config = {
  PORT: process.env.PORT || 3001,
  DATABASE_URL: process.env.DATABASE_URL,
  SALT_ROUNDS: 5,
  SECRET_KEY: process.env.SECRET_KEY,
};
if (!config.DATABASE_URL) {
  console.warn("WARNING: DATABASE_URL not set in environment variables!");
}
if (!process.env.SECRET_KEY) {
  console.warn("WARNING: SECRET_KEY not set in environment variables!");
}

export default config;
