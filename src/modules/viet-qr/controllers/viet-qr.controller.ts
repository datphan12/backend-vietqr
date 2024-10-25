import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { VietQrService } from '../services/viet-qr.service';
import { TransactionCallback } from '../interfaces/TransactionCallback';
import { VietQrTokenGenerateDto } from '../dtos/VietQrTokenGenerate.dto';
import { GenerateCustomerDto } from '../dtos/GenerateCustomer.dto';

@Controller()
export class VietQrController {
  constructor(private readonly vietQrService: VietQrService) {}
  @Post('viet-qr-token-generate')
  vietQrGenerateToken(@Body() vietQrTokenGenerateDto: VietQrTokenGenerateDto) {
    return this.vietQrService.vietQrGenerateToken(vietQrTokenGenerateDto);
  }

  @Post('viet-qr-generate-customer')
  generateCustomer(
    @Headers('authorization') token: string,
    @Body() generateCustomerDto: GenerateCustomerDto,
  ) {
    return this.vietQrService.vietQrGenerateCustomer(
      token,
      generateCustomerDto,
    );
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
