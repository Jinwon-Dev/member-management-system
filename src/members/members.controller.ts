import { Body, Controller, Get, Post } from '@nestjs/common';
import { MembersService } from './members.service';
import { Member } from './member.model';
import { CreateMemberDto } from './dto/create-member.dto';

@Controller('members')
export class MembersController {
  constructor(private membersService: MembersService) {} // dependency injection(의존성 주입)

  @Get('/')
  getAllMember(): Member[] {
    return this.membersService.getAllMembers();
  }

  @Post()
  createMember(@Body() createMemberDto: CreateMemberDto): Member {
    return this.membersService.createMember(createMemberDto);
  }
}
