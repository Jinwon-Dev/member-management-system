export interface Member {
  id: string;
  name: string;
  number: string;
  status: MemberStatus;
}

export enum MemberStatus { // 상태 추가
  BASIC = 'BASIC',
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM',
}
