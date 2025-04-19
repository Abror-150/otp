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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("./entities/user.entity");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const order_entity_1 = require("../order/entities/order.entity");
const product_entity_1 = require("../product/entities/product.entity");
const otplib_1 = require("otplib");
const mail_service_1 = require("../mail/mail.service");
let UserService = class UserService {
    userModel;
    order;
    product;
    mail;
    jwt;
    constructor(userModel, order, product, mail, jwt) {
        this.userModel = userModel;
        this.order = order;
        this.product = product;
        this.mail = mail;
        this.jwt = jwt;
    }
    async register(createUserDto) {
        let { userName, password } = createUserDto;
        let user = await this.userModel.findOne({ userName });
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const createdUser = await this.userModel.create({
            ...createUserDto,
            userName,
            password: hashedPassword,
        });
        let otp = otplib_1.totp.generate(createUserDto.email + 'email');
        await this.mail.sendEmail(createUserDto.email, otp, 'sizga otp keldi');
        return {
            createdUser,
        };
    }
    async verify(otpDto) {
        try {
            let { email, otp } = otpDto;
            otplib_1.totp.options = { step: 300, digits: 4 };
            let user = await this.userModel.findOne({ email });
            let match = otplib_1.totp.verify({ token: otp, secret: email + 'email' });
            console.log(match);
            if (!match) {
                throw new common_1.UnauthorizedException('otp not valid');
            }
            console.log(match);
            return match;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async login(loginDto) {
        const user = await this.userModel.findOne({ email: loginDto.email });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid password');
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
    async myOrder(userId) {
        try {
            const orders = await this.order.find({ user: userId }).populate('user');
            return orders;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async myProduct(userId) {
        try {
            const products = await this.order
                .find({ user: userId })
                .populate('user')
                .populate('product');
            return products;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findOne(id) {
        return this.userModel.findById(id);
    }
    async update(id, updateUserDto) {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    }
    async remove(id) {
        return this.userModel.findByIdAndDelete(id);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(order_entity_1.Order.name)),
    __param(2, (0, mongoose_1.InjectModel)(product_entity_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mail_service_1.MailService,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map