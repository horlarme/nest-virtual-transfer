import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);

    const validPassword = await compare(password, `${user?.password}`);

    if (!validPassword) throw new HttpException('Invalid credentials', 401);

    return {
      access_token: this.jwtService.sign({
        user: user!.id,
        sub: user?.id,
      }),
    };
  }

  validateUser(userId: number) {
    return this.userService.findOneById(userId).then((user) => {
      if (!user) throw new UnauthorizedException();

      return user;
    });
  }
}
