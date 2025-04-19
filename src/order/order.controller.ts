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
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Roles } from 'src/decarator/dec';
import { RoleGuard } from 'src/auth/role.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { Rolee } from 'src/enum/en';
import { MailService } from 'src/mail/mail.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly mail: MailService,
  ) {}

  @Post()
  @Roles(Rolee.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  async create(@Body() createOrderDto: CreateOrderDto) {
    await this.mail.sendEmail(
      'urazalievv.abror@gmail.com',
      'order qilindi',
      'user tomonidan',
    );
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @Roles(Rolee.ADMIN, Rolee.USER)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @Roles(Rolee.ADMIN, Rolee.USER)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rolee.ADMIN, Rolee.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @Roles(Rolee.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
