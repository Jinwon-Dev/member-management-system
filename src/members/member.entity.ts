import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MemberStatus } from './member-status.enum';
import { User } from '../auth/user.entity';

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

  @ManyToOne((type) => User, (user) => user.members, { eager: false }) // 관계 형성
  user: User;
}
