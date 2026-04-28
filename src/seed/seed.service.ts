import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

interface PokeApiResponse {
  results: { name: string; url: string }[];
}

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    const { data } = await this.axios.get<PokeApiResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=600',
    );

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      console.log(segments);
      const no = +segments[segments.length - 2];
      console.log(no);
      console.log({ name, no });
    });
    return data.results;
  }
}
