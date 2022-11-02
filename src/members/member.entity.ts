import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MemberStatus } from './member.model';

@Entity()
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  number: string;

  @Column()
  status: MemberStatus;
}