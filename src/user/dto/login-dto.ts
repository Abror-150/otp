import { ApiProperty } from '@nestjs/swagger';

export class CreateUserLoginDto {
  @ApiProperty({ example: 'john@gmail.com', description: 'email of the user' })
  email: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Password of the user',
  })
  password: string;
}