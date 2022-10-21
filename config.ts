const config = {
  api: {
    url: process.env.API_URL!,
    apiKey: process.env.API_KEY!,
  },
  postgres: {
    host: process.env.POSTGRES_HOST!,
    port: Number(process.env.POSTGRES_PORT!),
    username: process.env.POSTGRES_USERNAME!,
    password: process.env.POSTGRES_PASSWORD!,
    database: process.env.POSTGRES_DATABASE!,
    logging: Boolean(process.env.POSTGRES_LOGGING ?? false),
  },
};

export default config;
