import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLoginDTO, User } from '../model/user.model';
import { HolderModel } from 'src/app/base/model/holder.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    actualUser: User;

    loginUrl = 'http://localhost:5000/login';
    registerUrl = 'http://localhost:5000/register';
    userUrl = 'http://localhost:5000/user';

    constructor(private httpClient: HttpClient) { }


    login(username: string, password: string): Observable<UserLoginDTO> {
        const body = JSON.stringify({ 'username': username, 'password': password });
        return this.httpClient.post<UserLoginDTO>(this.loginUrl, body);
    }

    register(user: User): Observable<void> {
        return this.httpClient.put<void>(this.registerUrl, JSON.stringify(user));
    }

    getUser(username: string): Observable<User> {
        let params = new HttpParams();

        params = params.append('where', 'username==' + username);

        return this.httpClient.get<HolderModel<User>>(this.userUrl, { params: params }).pipe(
            map(resp => resp._items[0])
        );
    }

    setActualUser(user: User) {
        this.actualUser = user;
    }

    getActualUser(): User {
        return this.actualUser;
    }
}
