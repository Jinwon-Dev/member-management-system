import { IsNotEmpty } from 'class-validator';

export class CreateMemberDto {
  @IsNotEmpty() // 값이 비어있지 않도록 체크
  name: string;

  @IsNotEmpty() // 값이 비어있지 않도록 체크
  number: string;
}
