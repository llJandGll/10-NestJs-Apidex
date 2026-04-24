import { IsInt, IsNotEmpty, IsPositive, IsString, Min } from 'class-validator';

export class CreatePokemonDto {
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;

  @IsInt({ message: 'El numero del pokemon debe ser un numero entero' })
  @IsPositive({ message: 'El numero del pokemon debe ser un numero positivo' })
  @Min(1, { message: 'El numero del pokemon debe ser mayor a 0' })
  no: number;
}
