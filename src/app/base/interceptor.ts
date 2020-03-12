import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers = new HttpHeaders();
        if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
            headers = headers.append('Content-Type', 'application/json');
        }

        headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        if (req.method === 'PATCH' && !!req.body && !!req.body._etag) {
            headers = headers.append('If-Match', req.body._etag);
        }

        const customReq = req.clone({
            headers: headers
        });

        if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
            delete customReq.body._links;
            delete customReq.body._updated;
            delete customReq.body._created;
            delete customReq.body._etag;
            delete customReq.body.hash;
        }

        return next.handle(customReq);
    }
}
