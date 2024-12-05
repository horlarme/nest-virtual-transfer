import { LoginDto } from './login.dto';

describe('LoginRequest', () => {
  it('should be defined', () => {
    expect(new LoginDto()).toBeDefined();
  });
});
