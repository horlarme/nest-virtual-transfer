import { Controller } from '@nestjs/common';
import { VirtualAccountService } from './virtual-account.service';

@Controller('virtual-account')
export class VirtualAccountController {
  constructor(private readonly virtualAccountService: VirtualAccountService) {}
}
