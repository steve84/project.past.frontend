import { BaseModel } from '../../base/model/base.model';

export class Currency extends BaseModel {
    name: string;
    forex_currency: string;
    crypto_currency: string;
}