import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

interface PokeApiResponse {
  results: { name: string; url: string }[];
}

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeApiResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
    );

    const pokemons = data.results.map(({ name, url }) => {
      console.log(url);
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];
      return { name, no };
    });

    await this.pokemonModel.insertMany(pokemons);

    return 'Seed excute, pokemons inserted';
  }
}
