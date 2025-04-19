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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserLoginDto } from './dto/login-dto';
import { MailService } from 'src/mail/mail.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/decarator/dec';
import { Rolee } from 'src/enum/en';
import { otpDto } from './dto/otp.dto';
import { totp } from 'otplib';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly mail: MailService,
  ) {}

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }
  @Post('/verify')
  async verify(@Body() otpDto: otpDto) {
    return this.userService.verify(otpDto);
  }
  @Post('/login')
  async login(@Body() CreateUserLoginDto: CreateUserLoginDto) {
    await this.mail.sendEmail(
      CreateUserLoginDto.email,
      'login boldi',
      'sizning nomingizdan login  otildi  qurilma windows 11 pro',
    );
    return this.userService.login(CreateUserLoginDto);
  }

  @Get()
  @Get(':id')
  @Roles(Rolee.ADMIN, Rolee.USER)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  findAll() {
    return this.userService.findAll();
  }
  @Get('/myOrder/:id')
  @Get(':id')
  @Roles(Rolee.ADMIN, Rolee.USER)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  myOrder(@Param('id') id: string) {
    return this.userService.myOrder(id);
  }
  @Get('/myProduct/:id')
  @Get(':id')
  @Roles(Rolee.ADMIN, Rolee.USER)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  myProduct(@Param('id') id: string) {
    return this.userService.myProduct(id);
  }

  @Get(':id')
  @Roles(Rolee.ADMIN, Rolee.USER)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rolee.ADMIN, Rolee.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Rolee.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
