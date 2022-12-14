<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

---
## Project
[Nest.js](https://docs.nestjs.com/)를 이용하여 회원 관리 시스템을 구현합니다.

</br>

"개인 정보 보호를 위해 업로드 하지 않은 파일들이 있습니다."

- `src/configs/typeorm.config.ts`
  ```typescript
  import { TypeOrmModuleOptions } from '@nestjs/typeorm';
  import * as config from 'config';

  const dbConfig = config.get('db');

  export const typeORMConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DB_NAME || dbConfig.database,
    synchronize: dbConfig.synchronize,
    };
    ```

</br>

- `docker/.env`
  ```env
  DB_NAME=[사용자 지정 dbname]
  DB_USER=[사용자 지정 username]
  DB_PASSWORD=[사용자 지정 password]
  POSTGRES_HOME=./postgres
  ```

</br>

- `docker/docker-compose.yml`
  ```yml
  version: '3.9'
  services:
    database:
      image: postgres
      container_name: [사용자 지정 dbname]
      environment:
        POSTGRES_DB: "${DB_NAME}"
        POSTGRES_USER: "${DB_USER}"
        POSTGRES_PASSWORD: "${DB_PASSWORD}"
        POSTGRES_INITDB_ARGS: "--encoding=UTF-8 --lc-collate=C"
      ports:
        - 15432:5432
      volumes:
        - "${POSTGRES_HOME}/data/:/var/lib/postgresql/data/"
  ```

</br>

- `src/auth/auth.module.ts`
  ```typescript
  import { Module } from '@nestjs/common';
  import { AuthController } from './auth.controller';
  import { AuthService } from './auth.service';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { User } from './user.entity';
  import { PassportModule } from '@nestjs/passport';
  import { JwtModule } from '@nestjs/jwt';

  @Module({
    imports: [
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register({
        secret: '사용자 지정 Secret Key',
        signOptions: {
          expiresIn: 60 * 60,
        },
      }),
      TypeOrmModule.forFeature([User]),
    ],
    controllers: [AuthController],
    providers: [AuthService],
  })
  export class AuthModule {}
  ```

</br>

- `src/auth/jwt.strategy.ts`
  ```typescript
  @Injectable()
  export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
      @InjectRepository(User)
      private userRepository: UserRepository,
    ) {
      super({
        secretOrKey: '[사용자 지정 Secret Key]',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      });
    }

    async validate(payload) {
      const { username } = payload;
      const user: User = await this.userRepository.findOne({
        where: { username: username },
      });

      if (!user) {
        throw new UnauthorizedException();
      }

      return user;
    }
  }
  ```

</br>

- `config/default.yml`
  ```yml
  server:
    port: 3000
  db:
    type: 'postgres'
    port: 15432 
    database: '[사용자 지정 dbname]'
  jwt:
    expiresIn: 3600
  ```

<br/>

- `config/development.yml`
  ```yml
  db:
    host: 'localhost'
    username: '[사용자 지정 username]'
    password: '[사용자 지정 password]'
    synchronize: true
  jwt:
    secret: '[사용자 지정 Secret Key]'
  ```

<br/>

- `production.yml`
  ```yml
  db:
    synchronize: false
  ```

<br/>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

</br>

## Installation

```bash
$ npm install
```

</br>

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

</br>

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

</br>

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

</br>

## Stay in touch

- Author - [Kamil My힄liwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

</br>

## License

Nest is [MIT licensed](LICENSE).
