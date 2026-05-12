import * as joi from 'joi';

export const joiValidationSchema = joi.object({
  MONGODB: joi.string().required(),
  PORT: joi.number().default(3000),
  ENVIRONMENT: joi
    .string()
    .valid('development', 'staging', 'production')
    .required(),
  DEFAULT_LIMIT_POKEMON: joi.number().default(5),
});
