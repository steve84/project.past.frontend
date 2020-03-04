import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private httpClient: HttpClient) { }


    login(username: string, password: string): Observable<string> {
        return this.httpClient.post<string>('http://localhost:5000/login', JSON.stringify({ 'username': username, 'password': password }));
    }
}
