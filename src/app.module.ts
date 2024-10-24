import { Module } from '@nestjs/common';
import { VietQrModule } from './modules/viet-qr/viet-qr.module';
import { RouterModule, Routes } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

const routes: Routes = [
  {
    path: '/v1',
    children: [{ path: '/viet-qr', module: VietQrModule }],
  },
];
console.log('Current NODE_ENV:', process.env.NODE_ENV);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: true ? '.env.development' : '.env.test',
    }),
    RouterModule.register(routes),
    VietQrModule,
  ],
})
export class AppModule {}
