import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    console.log({ value, metadata });

    if (!isValidObjectId(value))
      throw new BadRequestException(`Mongo Id invalido`, {
        cause: { value },
        description: `El pokemon con el id ${value} no es valido.`,
      });

    return value;
  }
}
