import { Module } from '@nestjs/common';
import { MembersModule } from './members/members.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), MembersModule, AuthModule], // typeORM 모듈 추가
})
export class AppModule {}
