import { BaseModel } from 'src/app/base/model/base.model';

export interface Order extends BaseModel {
    id: number;
    buy: boolean;
    qty: number;
    price: number;
}