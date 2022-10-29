import { Injectable } from '@nestjs/common';
import { Member, MemberStatus } from './member.model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class MembersService {
  private members: Member[] = [];

  getAllMembers(): Member[] {
    return this.members;
  }

  createMember(name: string, number: string, email: string) {
    const member: Member = {
      id: uuid(), // uuid를 사용하여 유니크한 값을 id에 부여하기
      name,
      number,
      status: MemberStatus.BASIC,
    };

    this.members.push(member);
    return member;
  }
}
