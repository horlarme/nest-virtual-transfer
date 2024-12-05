import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { RegistrationDto } from '../auth/dto/login/registration.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor() {}

  findOneById(id: number) {
    return User.findOneBy({ id });
  }

  findUserByEmail(email: string) {
    return User.findOneBy({
      email,
    });
  }

  async createUserAccount(data: RegistrationDto) {
    return User.create({
      ...data,
      password: await hash(data.password, 10),
    });
  }

  async checkEmailExistence(email: string) {
    return User.existsBy({ email });
  }
}
