import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TransactionCallback } from '../interfaces/TransactionCallback';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VietQrService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async generateToken(authHeader: string) {
    console.log(this.configService.getOrThrow('SECRET_KEY'));

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      throw new UnauthorizedException(
        'Authorization header is missing or invalid',
      );
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
      'utf-8',
    );
    const [username, password] = credentials.split(':');

    if (
      username === this.configService.getOrThrow('VALID_USERNAME') &&
      password === this.configService.getOrThrow('VALID_PASSWORD')
    ) {
      const token = this.jwtService.sign(
        { username },
        {
          secret: this.configService.getOrThrow('SECRET_KEY'),
          algorithm: 'HS512',
          expiresIn: '5m',
        },
      );
      return {
        access_token: token,
        token_type: 'Bearer',
        expires_in: 300,
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async handleTransactionSync(authHeader: string, body: any) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authorization header is missing or invalid',
      );
    }

    const token = authHeader.substring('Bearer '.length).trim();
    if (!this.validateToken(token)) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    const transactionCallback: TransactionCallback = {
      transactionid: body.transactionid,
      transactiontime: body.transactiontime,
      referencenumber: body.referencenumber,
      amount: body.amount,
      content: body.content,
      bankaccount: body.bankaccount,
      orderId: body.orderId,
      sign: body.sign,
      terminalCode: body.terminalCode,
      urlLink: body.urlLink,
      serviceCode: body.serviceCode,
      subTerminalCode: body.subTerminalCode,
    };

    try {
      const refTransactionId = '1234768993348789';
      return {
        message: 'Transaction processed successfully',
        refTransactionId,
      };
    } catch (error) {
      throw new BadRequestException({ status: true, message: error.message });
    }
  }
  private validateToken(token: string): boolean {
    try {
      this.jwtService.verify(token, {
        secret: this.configService.getOrThrow('SECRET_KEY'),
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
