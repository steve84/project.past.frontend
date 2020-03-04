import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        debugger
        let headers = new HttpHeaders();
        if (req.method === 'POST') {
            headers = headers.append('Content-Type', 'application/json');
        }
        headers = headers.append('Authorization', 'Basic ' + localStorage.getItem('token'));

        const customReq = req.clone({
            headers: headers
        });

        return next.handle(customReq);
    }
}
