import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberRepository } from './member.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MemberRepository])],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}
