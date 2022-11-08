import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Member } from '../members/member.entity';

@Entity()
@Unique([`username`]) // 사용자 이름 유니크화(중복 X)
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany((type) => Member, (member) => member.user, { eager: true }) // 관계 형성
  members: Member[];
}
