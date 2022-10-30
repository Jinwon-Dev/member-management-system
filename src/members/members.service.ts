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
    // 회원 정보 생성 기능
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
    // 특정 ID의 회원 정보를 가져오는 기능
    return this.members.find((member) => member.id === id);
  }

  deleteMember(id: string): void {
    // 특정 ID의 회원 정보를 삭제하는 기능
    this.members = this.members.filter((member) => member.id !== id);
  }

  updateMemberStatus(id: string, status: MemberStatus): Member {
    // 특정 ID의 회원 상태(등급)를 수정하는 기능
    const member = this.getMemberById(id);
    member.status = status;
    return member;
  }
}
