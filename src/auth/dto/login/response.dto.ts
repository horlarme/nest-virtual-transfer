import { User } from '../../../user/entities/user.entity';

export class LoginResponseDto extends User {
  accessToken: string;
}
