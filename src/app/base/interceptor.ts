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

        for (let k of req.headers.keys()) {
            headers = headers.append(k, req.headers.get(k));
        }
        if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
            headers = this.appendHeaderIfNotExists(headers, 'Content-Type', 'application/json');
        }

        // Disable browser cache control
        headers = this.appendHeaderIfNotExists(headers, 'Cache-Control', 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0');
        headers = this.appendHeaderIfNotExists(headers, 'Pragma', 'no-cache');
        headers = this.appendHeaderIfNotExists(headers, 'Expires', '0');

        if (!req.url.endsWith('login') || !req.url.endsWith('register')) {
            headers = this.appendHeaderIfNotExists(headers, 'Authorization', 'Bearer ' + localStorage.getItem('token'));
        }

        // Update
        if (req.method === 'PATCH' && !!req.body && !!req.body._etag) {
            headers = this.appendHeaderIfNotExists(headers, 'If-Match', req.body._etag);
        }
        debugger
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


    private appendHeaderIfNotExists(headers: HttpHeaders, key: string, value: string): HttpHeaders {
        if (!headers.has(key)) {
            headers = headers.append(key, value);
        }
        return headers;
    }
}
