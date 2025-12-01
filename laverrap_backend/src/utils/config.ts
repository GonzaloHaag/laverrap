const config = {
  PORT: process.env.PORT || 3001,
  DATABASE_URL: process.env.DATABASE_URL,
  SALT_ROUNDS: 5,
  SECRET_KEY: process.env.SECRET_KEY || "secret",
};

export default config;