import { Module } from '@nestjs/common';
import { VietQrController } from './controllers/viet-qr.controller';
import { VietQrService } from './services/viet-qr.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [VietQrController],
  providers: [VietQrService],
})
export class VietQrModule {}
