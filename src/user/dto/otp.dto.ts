import { ApiProperty } from '@nestjs/swagger';

export class otpDto {
  @ApiProperty({ example: 'johndoe@gmail.com' })
  email: string;
  @ApiProperty({ example: '1234' })
  otp: string;
}
