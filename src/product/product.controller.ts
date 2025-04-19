import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/decarator/dec';
import { Rolee } from 'src/enum/en';
import { MailService } from 'src/mail/mail.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly mail: MailService,
  ) {}

  @Post()
  @Roles(Rolee.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  async create(@Body() createProductDto: CreateProductDto) {
    await this.mail.sendEmail(
      'urazalievv.abror@gmail.com',
      'product qilindi',
      'user tomonidan',
    );
    return this.productService.create(createProductDto);
  }

  @Get()
  @Roles(Rolee.ADMIN, Rolee.USER)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @Roles(Rolee.ADMIN, Rolee.USER)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }
  @Roles(Rolee.ADMIN, Rolee.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Roles(Rolee.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
