import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './member.entity';
import { MemberStatusValidationPipe } from './pipes/member-status-validation.pipe';
import { MemberStatus } from './member-status.enum';

@Controller('members')
export class MembersController {
  constructor(private membersService: MembersService) {} // dependency injection(의존성 주입)

  @Post() // 회원 정보 생성 기능
  @UsePipes(ValidationPipe) // 파이프를 이용한 유효성 체크
  createMember(@Body() createMemberDto: CreateMemberDto): Promise<Member> {
    // DTO 적용
    return this.membersService.createMember(createMemberDto);
  }

  @Get() // 모든 회원 정보를 가져오는 기능
  getAllMember(): Promise<Member[]> {
    return this.membersService.getAllMembers();
  }

  @Get('/:id') // 특정 ID의 회원 정보를 가져오는 기능
  getMemberById(@Param('id') id: number): Promise<Member> {
    return this.membersService.getMemberById(id);
  }

  @Delete('/:id') // 특정 ID의 회원 정보를 삭제하는 기능
  deleteMember(@Param('id', ParseIntPipe) id): Promise<void> {
    return this.membersService.deleteMember(id);
  }

  @Patch('/:id/status') // 특정 ID의 회원 상태(등급)를 수정하는 기능
  updateMemberStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', MemberStatusValidationPipe) status: MemberStatus,
  ) {
    return this.membersService.updateMemberStatus(id, status);
  }
}
