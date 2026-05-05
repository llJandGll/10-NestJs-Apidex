import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    createPokemonDto.name = this.changeToLowerCase(createPokemonDto.name);

    try {
      return await this.pokemonModel.create(createPokemonDto);
    } catch (error) {
      this.handleMongoException(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<Pokemon[]> {
    const { limit = 10, offset = 0 } = paginationDto;
    return await this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v')
      .exec();
  }

  async findOne(termn: string): Promise<Pokemon> {
    let pokemon: Pokemon | null = null;

    if (isValidObjectId(termn)) {
      pokemon = await this.pokemonModel.findById(termn);
    }

    if (!pokemon && !isNaN(+termn)) {
      pokemon = await this.pokemonModel.findOne({ no: +termn });
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: termn.toLowerCase().trim(),
      });
    }

    if (!pokemon) {
      throw new NotFoundException(
        `Pokemon con termino "${termn}" no encontrado`,
      );
    }

    console.log('Pokemon encontrado', pokemon);
    return pokemon;
  }

  async update(
    termn: string,
    updatePokemonDto: UpdatePokemonDto,
  ): Promise<Pokemon> {
    const pokemon = await this.findOne(termn);

    if (updatePokemonDto.name !== undefined) {
      updatePokemonDto.name = this.changeToLowerCase(updatePokemonDto.name);
    }

    try {
      const pokemonUpdated = await this.pokemonModel.findByIdAndUpdate(
        pokemon._id,
        updatePokemonDto,
        { returnDocument: 'after' },
      );

      if (!pokemonUpdated) {
        throw new NotFoundException(
          `Pokemon con id ${String(pokemon._id)} no encontrado`,
        );
      }

      return pokemonUpdated;
    } catch (error) {
      this.handleMongoException(error);
    }
  }

  async remove(id: string): Promise<Pokemon> {
    const pokemon = await this.findOne(id);

    const deleted = await this.pokemonModel.findByIdAndDelete(pokemon._id);

    // ? Borrrado en una sola consulta
    // const deleted = await this.pokemonModel.deleteOne({ _id: id });

    // if (deleted.deletedCount === 0) {
    //   throw new NotFoundException(`Pokemon con id ${id} no encontrado`);
    // }

    if (!deleted) {
      throw new NotFoundException(`Pokemon con id ${id} no encontrado`);
    }

    return deleted;
  }

  // * Métodos extra

  private changeToLowerCase(name: string): string {
    return name.toLowerCase().trim();
  }

  private handleMongoException(error: any): never {
    if (error instanceof NotFoundException) throw error;
    if (error instanceof BadRequestException) throw error;

    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: number }).code === 11000
    ) {
      const keyValue = (error as { keyValue?: Record<string, unknown> })
        .keyValue;
      throw new BadRequestException(
        `Ya existe un pokemon con ${JSON.stringify(keyValue)}`,
      );
    }

    console.error(error);
    throw new InternalServerErrorException(
      'Error inesperado al interactuar con la base de datos',
    );
  }
}
