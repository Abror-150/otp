import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'Username of the user' })
  userName: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Email address of the user',
  })
  email: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Password for the user account',
  })
  password: string;
  @ApiProperty({
    example: '900999999',
    description: 'phoneNumber',
  })
  phone: string;

  @ApiProperty({
    example: 'admin',
    description: 'Role of the user (e.g., admin, user)',
  })
  role: string;
}
