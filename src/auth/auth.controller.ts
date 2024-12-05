import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login/login.dto';
import { ApiCreatedResponse, ApiDefaultResponse } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login/response.dto';
import { RegistrationDto } from './dto/login/registration.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiDefaultResponse({ type: LoginResponseDto })
  @Post('/login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data.email, data.password);
  }

  @ApiCreatedResponse({ type: LoginResponseDto })
  @Post('/register')
  register(@Body() data: RegistrationDto): Promise<LoginResponseDto> {
    return this.authService.register(data);
  }
}
