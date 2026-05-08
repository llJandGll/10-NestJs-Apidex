interface EnvConfigInterface {
  port: number;
  mongoDb: string;
  environment: string;
}

export const envConfig = (): EnvConfigInterface => {
  return {
    port: Number(process.env.PORT) || 3001,
    mongoDb: process.env.MONGODB || '',
    environment: process.env.NODE_ENV || 'development',
  };
};
