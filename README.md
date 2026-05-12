<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar repositorio
2. Tener nestJs cli instalado

```bash
pnpm install -g @nestjs/cli
```

2. Ejecuta pnpm install

3. Levantar docker - base de datos

```bash
docker-compose up -d
```

4. Conectar con table plus

- url : mongodb://localhost:27017/nest-pokemon
- user : [Siesquetiene]
- password : [Siesquetiene]
-

5. Clonar archivo **.env.template**

6. LLenar las variables ede entorno definidas en el `.env` con su cluster de mongoose

7. Correr la aplicacion

```bash
pnpm run start:dev
```

8. Correr la seed para llenar la base de datos de pokemons

```bash
pnpm run seed
```

## Stack de tecnologias de este proyecto

- MONGODB
- NESTJS
- TYPESCRIPT
