import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findUserByEmail(email: string) {
    return this.userRepository.findOneBy({
      email,
    });
  }

  login(email: string, password: string) {
    return this.findUserByEmail(email)
      .then((user) => bcrypt.compare(password, `${user?.password}`))
      .then((response) => response);
  }
}
