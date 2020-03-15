import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers = new HttpHeaders();
        if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
            headers = headers.append('Content-Type', 'application/json');
        }

        // Disable browser cache control
        headers = headers.append('Cache-Control', 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0');
        headers = headers.append('Pragma', 'no-cache');
        headers = headers.append('Expires', '0');

        if (!req.url.endsWith('login') || !req.url.endsWith('register')) {
            headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        }

        // Update
        if (req.method === 'PATCH' && !!req.body && !!req.body._etag) {
            headers = headers.append('If-Match', req.body._etag);
        }

        const customReq = req.clone({
            headers: headers,
            //url: req.url.replace('localhost', '192.168.1.127')
        });

        if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
            delete customReq.body._links;
            delete customReq.body._updated;
            delete customReq.body._created;
            delete customReq.body._etag;
            delete customReq.body.hash;
        }

        return next.handle(customReq).pipe(
            catchError(err => {
                if (err.status === 401) {
                    this.router.navigate(['login']);
                }
                return throwError(err);
            })
        );
    }
}
