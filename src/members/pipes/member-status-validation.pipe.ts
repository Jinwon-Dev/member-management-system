import { BadRequestException, PipeTransform } from '@nestjs/common';
import { MemberStatus } from '../member-status.enum';

export class MemberStatusValidationPipe implements PipeTransform {
  // 유효성 체크를 위한 커스텀 파이프
  readonly StatusOptions = [
    MemberStatus.BASIC,
    MemberStatus.STANDARD,
    MemberStatus.PREMIUM,
  ];

  transform(value: any) {
    // 상태(등급)를 수정할 때 유효성 체크
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
