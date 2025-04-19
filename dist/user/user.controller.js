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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const login_dto_1 = require("./dto/login-dto");
const mail_service_1 = require("../mail/mail.service");
const auth_guard_1 = require("../auth/auth.guard");
const role_guard_1 = require("../auth/role.guard");
const dec_1 = require("../decarator/dec");
const en_1 = require("../enum/en");
const otp_dto_1 = require("./dto/otp.dto");
let UserController = class UserController {
    userService;
    mail;
    constructor(userService, mail) {
        this.userService = userService;
        this.mail = mail;
    }
    async register(createUserDto) {
        return this.userService.register(createUserDto);
    }
    async verify(otpDto) {
        return this.userService.verify(otpDto);
    }
    async login(CreateUserLoginDto) {
        await this.mail.sendEmail(CreateUserLoginDto.email, 'login boldi', 'sizning nomingizdan login  otildi  qurilma windows 11 pro');
        return this.userService.login(CreateUserLoginDto);
    }
    findAll() {
        return this.userService.findAll();
    }
    myOrder(id) {
        return this.userService.myOrder(id);
    }
    myProduct(id) {
        return this.userService.myProduct(id);
    }
    findOne(id) {
        return this.userService.findOne(id);
    }
    update(id, updateUserDto) {
        return this.userService.update(id, updateUserDto);
    }
    remove(id) {
        return this.userService.remove(id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('/verify'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [otp_dto_1.otpDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verify", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.CreateUserLoginDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Get)(':id'),
    (0, dec_1.Roles)(en_1.Rolee.ADMIN, en_1.Rolee.USER),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/myOrder/:id'),
    (0, common_1.Get)(':id'),
    (0, dec_1.Roles)(en_1.Rolee.ADMIN, en_1.Rolee.USER),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "myOrder", null);
__decorate([
    (0, common_1.Get)('/myProduct/:id'),
    (0, common_1.Get)(':id'),
    (0, dec_1.Roles)(en_1.Rolee.ADMIN, en_1.Rolee.USER),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "myProduct", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, dec_1.Roles)(en_1.Rolee.ADMIN, en_1.Rolee.USER),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, dec_1.Roles)(en_1.Rolee.ADMIN, en_1.Rolee.SUPER_ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, dec_1.Roles)(en_1.Rolee.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        mail_service_1.MailService])
], UserController);
//# sourceMappingURL=user.controller.js.map