import { Injectable } from '@nestjs/common';
import { Member, MemberStatus } from './member.model';
import { v1 as uuid } from 'uuid';
import { CreateMemberDto } from './dto/create-member.dto';

@Injectable()
export class MembersService {
  private members: Member[] = [];

  getAllMembers(): Member[] {
    return this.members;
  }

  createMember(createMemberDto: CreateMemberDto) {
    // 게시물 생성 기능
    // DTO 적용
    const { name, number } = createMemberDto;

    const member: Member = {
      id: uuid(), // uuid를 사용하여 유니크한 값을 id에 부여하기
      name,
      number,
      status: MemberStatus.BASIC,
    };

    this.members.push(member);
    return member;
  }

  getMemberById(id: string): Member {
    // 특정 ID의 게시물을 가져오는 기능
    return this.members.find((member) => member.id === id);
  }
}
