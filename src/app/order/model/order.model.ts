import { BaseModel } from '../../base/model/base.model';

export class Order extends BaseModel {
    buy: boolean;
    qty: number;
    price: number;
    exchange: number;
    currency: number;
    user: number;
    order_type: number;
}