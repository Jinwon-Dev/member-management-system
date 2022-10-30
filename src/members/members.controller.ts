import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { Member, MemberStatus } from './member.model';
import { CreateMemberDto } from './dto/create-member.dto';

@Controller('members')
export class MembersController {
  constructor(private membersService: MembersService) {} // dependency injection(의존성 주입)

  @Get('/')
  getAllMember(): Member[] {
    return this.membersService.getAllMembers();
  }

  @Post() // 회원 정보 생성 기능
  createMember(@Body() createMemberDto: CreateMemberDto): Member {
    // DTO 적용
    return this.membersService.createMember(createMemberDto);
  }

  @Get('/:id') // 특정 ID의 회원 정보를 가져오는 기능
  getMemberById(@Param('id') id: string): Member {
    return this.membersService.getMemberById(id);
  }

  @Delete('/:id') // 특정 ID의 회원 정보를 삭제하는 기능
  deleteMember(@Param('id') id: string): void {
    this.membersService.deleteMember(id);
  }

  @Patch('/:id/status') // 특정 ID의 회원 상태(등급)을 수정하는 기능
  updateMemberStatus(
    @Param('id') id: string,
    @Body('status') status: MemberStatus,
  ) {
    return this.membersService.updateMemberStatus(id, status);
  }
}
