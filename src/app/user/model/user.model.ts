import { BaseModel } from 'src/app/base/model/base.model';

export interface User extends BaseModel {
    username: string;
    password: string;
    name: string;
}