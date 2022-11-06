import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bcrpyt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    // 회원 가입 기능
    const { username, password } = authCredentialsDto;

    const salt = await bcrpyt.genSalt(); // bcrpyt 모듈을 이용하여 비밀번호 암호화
    const hashedPassword = await bcrpyt.hash(password, salt);

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === `23505`) {
        // 사용자 이름이 중복일 시 예외 생성
        throw new ConflictException(`Existing username`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
