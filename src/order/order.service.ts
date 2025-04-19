import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './entities/order.entity';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = await this.orderModel.create(createOrderDto);
    return {
      message: 'Order created successfully',
      order,
    };
  }

  async findAll() {
    return await this.orderModel.find().populate('user').populate('product');
  }

  async findOne(id: string) {
    const order = await this.orderModel
      .findById(id)
      .populate('user')
      .populate('product');
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, {
      new: true,
    });
    if (!order) throw new NotFoundException('Order not found');
    return {
      message: 'Order updated successfully',
      order,
    };
  }

  async remove(id: string) {
    const result = await this.orderModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Order not found');
    return { message: 'Order deleted successfully' };
  }
}
