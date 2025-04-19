import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    example: 'f7a3d558-6d4a-4f38-8c92-90bdbb1ec2ff',
    description: 'ID of the user placing the order (UUID)',
  })
  user: string;

  @ApiProperty({
    example: 'a9e1cd24-3b8c-4c9d-9871-0b6c7d6a7fcb',
    description: 'ID of the product being ordered (UUID)',
  })
  product: string;
}
