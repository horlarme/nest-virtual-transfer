import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegistrationDto } from './dto/login/registration.dto';
import { LoginResponseDto } from './dto/login/response.dto';

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
      ...user,
      accessToken: this.jwtService.sign({
        user: user!.id,
        sub: user!.id,
      }),
    };
  }

  async validateUser(userId: number) {
    const user = await this.userService.findOneById(userId);
    if (!user) throw new UnauthorizedException();
    return user;
  }

  async register(data: RegistrationDto): Promise<LoginResponseDto> {
    if (await this.userService.checkEmailExistence(data.email)) {
      throw new HttpException('Email already exists', 400);
    }

    const user = await this.userService.createUserAccount(data);

    return {
      ...user,
      accessToken: this.jwtService.sign({ user: user!.id, sub: user!.id }),
    };
  }
}
