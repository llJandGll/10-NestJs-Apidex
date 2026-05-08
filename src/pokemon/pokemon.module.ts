//* nest
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

//* controllers
import { PokemonController } from './pokemon.controller';

//* entities
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

//* services
import { PokemonService } from './pokemon.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema,
      },
    ]),

    ConfigModule,
  ],
  exports: [MongooseModule],
})
export class PokemonModule {}
