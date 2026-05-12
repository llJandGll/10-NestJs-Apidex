import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function main() {
  // ? Creación de la aplicación
  const app = await NestFactory.create(AppModule);
  // ? Agregar pipes globales
  app.useGlobalPipes(
    new ValidationPipe({
      // ? Limpia el objeto de datos
      whitelist: true,
      // ? Prohíbe el objeto de datos
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      stopAtFirstError: true,
    }),
  );
  // ? Agrega un prefijo a todas las rutas
  app.setGlobalPrefix('api/v2');
  // ? Port
  console.log('paso por aqui');
  await app.listen(process.env.PORT!);
  console.log(`Application is running on port: ${process.env.PORT!}`);
}
void main();
