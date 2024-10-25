import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GenerateCustomerDto {
  @IsNotEmpty({ message: 'amount không được để trống' })
  amount: number;

  @IsNotEmpty({ message: 'content không được để trống' })
  @IsString({ message: 'content phải là string' })
  content: string;

  @IsNotEmpty({ message: 'bank account không được để trống' })
  @IsString({ message: 'bank account phải là string' })
  bankAccount: string;

  @IsNotEmpty({ message: 'bank code không được để trống' })
  @IsString({ message: 'bank code phải là string' })
  bankCode: string;

  @IsNotEmpty({ message: 'user bank name không được để trống' })
  @IsString({ message: 'user bank name phải là string' })
  userBankName: string;

  @IsOptional()
  @Transform(({ value }) => (value.length != 0 ? value : 'C'))
  transType: string;

  @IsOptional()
  orderId: string;

  @IsOptional()
  @Transform(({ value }) => (value != null ? value : 0))
  qrType: number;
}
