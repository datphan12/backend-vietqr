import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { VietQrService } from '../services/viet-qr.service';
import { TransactionCallback } from '../interfaces/TransactionCallback';

@Controller()
export class VietQrController {
  constructor(private readonly vietQrService: VietQrService) {}

  @Get()
  getHello(): string {
    return this.vietQrService.getHello();
  }

  @Post('token-generate')
  generateToken(@Headers('authorization') authHeader: string) {
    return this.vietQrService.generateToken(authHeader);
  }

  @Post('transaction-sync')
  handleTransactionSync(
    @Headers('authorization') authHeader: string,
    @Body() body: TransactionCallback,
  ) {
    return this.vietQrService.handleTransactionSync(authHeader, body);
  }
}
