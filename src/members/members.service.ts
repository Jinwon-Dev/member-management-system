import { Injectable, NotFoundException } from '@nestjs/common';
import { MemberStatus } from './member-status.enum';
import { CreateMemberDto } from './dto/create-member.dto';
import { MemberRepository } from './member.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './member.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: MemberRepository,
  ) {}

  async createMember(createMemberDto: CreateMemberDto): Promise<Member> {
    // 회원 정보 생성 기능
    // DTO 적용
    const { name, number } = createMemberDto;

    const member = this.memberRepository.create({
      name,
      number,
      status: MemberStatus.BASIC,
    });

    await this.memberRepository.save(member);
    return member;
  }

  async getMemberById(id: number): Promise<Member> {
    // 특정 ID의 회원 정보를 가져오는 기능
    const found = await this.memberRepository.findOne(id);

    if (!found) {
      // 존재하지 않는 ID의 회원 정보를 조회하려 할 때 예외 생성
      throw new NotFoundException(`can't find Member with id ${id}`);
    }

    return found;
  }

  async deleteMember(id: number): Promise<void> {
    // 특정 ID의 회원 정보를 삭제하는 기능
    const result = await this.memberRepository.delete(id);

    if (result.affected === 0) {
      // 존재하지 않는 ID의 회원 정보를 삭제하려 할 때 예외 생성
      throw new NotFoundException(`Can't find Member with id ${id}`);
    }
  }

  // updateMemberStatus(id: string, status: MemberStatus): Member {
  //   // 특정 ID의 회원 상태(등급)를 수정하는 기능
  //   const member = this.getMemberById(id);
  //   member.status = status;
  //   return member;
  // }
}
