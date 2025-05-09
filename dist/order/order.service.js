"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const order_entity_1 = require("./entities/order.entity");
const mongoose_2 = require("mongoose");
let OrderService = class OrderService {
    orderModel;
    constructor(orderModel) {
        this.orderModel = orderModel;
    }
    async create(createOrderDto) {
        const order = await this.orderModel.create(createOrderDto);
        return {
            message: 'Order created successfully',
            order,
        };
    }
    async findAll() {
        return await this.orderModel.find().populate('user').populate('product');
    }
    async findOne(id) {
        const order = await this.orderModel
            .findById(id)
            .populate('user')
            .populate('product');
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async update(id, updateOrderDto) {
        const order = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, {
            new: true,
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return {
            message: 'Order updated successfully',
            order,
        };
    }
    async remove(id) {
        const result = await this.orderModel.findByIdAndDelete(id);
        if (!result)
            throw new common_1.NotFoundException('Order not found');
        return { message: 'Order deleted successfully' };
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_entity_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OrderService);
//# sourceMappingURL=order.service.js.map