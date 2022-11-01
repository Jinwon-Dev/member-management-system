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

  export const typeormConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 15432, // 사용자 지정 포트
    username: '[사용자 지정 username]',
    password: '[사용자 지정 password]',
    database: '[사용자 지정 dbname]',
    synchronize: true,
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
