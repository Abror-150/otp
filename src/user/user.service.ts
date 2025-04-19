import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService, WrongSecretProviderError } from '@nestjs/jwt';
import { CreateUserLoginDto } from './dto/login-dto';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { otpDto } from './dto/otp.dto';
import { totp } from 'otplib';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Order.name) private order: Model<Order>,
    @InjectModel(Product.name) private product: Model<Product>,
    private readonly mail: MailService,

    private jwt: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    let { userName, password } = createUserDto;
    let user = await this.userModel.findOne({ userName });
    // if (user) {
    //   throw new Error('user already exits');
    // }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = await this.userModel.create({
      ...createUserDto,
      userName,
      password: hashedPassword,
    });
    let otp = totp.generate(createUserDto.email + 'email');
    await this.mail.sendEmail(createUserDto.email, otp, 'sizga otp keldi');
    return {
      createdUser,
    };
  }

  async verify(otpDto: otpDto) {
    try {
      let { email, otp } = otpDto;
      totp.options = { step: 300, digits: 4 };
      let user = await this.userModel.findOne({ email });
      // if (user) {
      //   throw new UnauthorizedException('email already exists');
      // }
      let match = totp.verify({ token: otp, secret: email + 'email' });
      console.log(match);

      if (!match) {
        throw new UnauthorizedException('otp not valid');
      }
      console.log(match);

      return match;
    } catch (error) {
      console.log(error);

      return error;
    }
  }

  async login(loginDto: CreateUserLoginDto) {
    const user = await this.userModel.findOne({ email: loginDto.email });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = await this.jwt.sign(user.id);

    return {
      message: 'Login successful',
      token,
    };
  }

  async findAll() {
    return this.userModel.find();
  }
  async myOrder(userId: string) {
    try {
      const orders = await this.order.find({ user: userId }).populate('user');
      return orders;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async myProduct(userId: string) {
    try {
      const products = await this.order
        .find({ user: userId })
        .populate('user')
        .populate('product');
      return products;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    return this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: any) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
