import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './common/config/env';

@Module({
  imports: [
    // ConfigModule.forRoot(),

    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [envConfig],
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    PokemonModule,

    MongooseModule.forRoot(envConfig().mongoDb),

    CommonModule,

    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
