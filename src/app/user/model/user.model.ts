import { BaseModel } from '../../base/model/base.model';

export class User extends BaseModel {
    username: string;
    password: string;
    name: string;
}

export class UserLoginDTO {
    token: string;
    username: string;
}