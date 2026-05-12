interface EnvConfigInterface {
  port: number;
  mongoDb: string;
  environment: string;
  default_limit_pokemon: number;
}

export const envConfig = (): EnvConfigInterface => {
  return {
    port: Number(process.env.PORT) || 3001,
    mongoDb: process.env.MONGODB || '',
    environment: process.env.NODE_ENV || 'development',
    default_limit_pokemon: +process.env.DEFAULT_LIMIT_POKEMON! || 10,
  };
};
