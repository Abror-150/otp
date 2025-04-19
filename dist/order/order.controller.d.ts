import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { MailService } from 'src/mail/mail.service';
export declare class OrderController {
    private readonly orderService;
    private readonly mail;
    constructor(orderService: OrderService, mail: MailService);
    create(createOrderDto: CreateOrderDto): Promise<{
        message: string;
        order: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./entities/order.entity").Order> & import("./entities/order.entity").Order & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> & import("mongoose").Document<unknown, {}, import("./entities/order.entity").Order> & import("./entities/order.entity").Order & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./entities/order.entity").Order> & import("./entities/order.entity").Order & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, import("./entities/order.entity").Order> & import("./entities/order.entity").Order & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./entities/order.entity").Order> & import("./entities/order.entity").Order & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, import("./entities/order.entity").Order> & import("./entities/order.entity").Order & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<{
        message: string;
        order: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./entities/order.entity").Order> & import("./entities/order.entity").Order & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> & import("mongoose").Document<unknown, {}, import("./entities/order.entity").Order> & import("./entities/order.entity").Order & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
