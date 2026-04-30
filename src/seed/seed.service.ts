import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

interface PokeApiResponse {
  results: { name: string; url: string }[];
}

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const { data } = await this.axios.get<PokeApiResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
    );

    const pokemons = data.results.map(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];
      return { name, no };
    });

    await this.pokemonModel.insertMany(pokemons);

    return 'Seed excute, pokemons inserted';
  }
}
