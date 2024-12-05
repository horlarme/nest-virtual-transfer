import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegistrationDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @MinLength(2)
  @MaxLength(225)
  firstName: string;

  @MinLength(2)
  @MaxLength(225)
  lastName: string;
}
