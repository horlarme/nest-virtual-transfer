import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistrationDto } from '../auth/dto/login/registration.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findOneById(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  findUserByEmail(email: string) {
    return this.usersRepository.findOneBy({
      email,
    });
  }

  async createUserAccount(data: RegistrationDto) {
    return this.usersRepository.save({
      ...data,
      password: await hash(data.password, 10),
    });
  }

  async checkEmailExistence(email: string) {
    return this.usersRepository.existsBy({ email });
  }
}
