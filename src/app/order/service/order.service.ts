import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HolderModel } from '../../base/model/holder.model';
import { Order } from '../model/order.model';
import { SortDirection } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

    private url = 'http://localhost:5000/order';

    constructor(private httpClient: HttpClient) { }

    getOrderPage(page?: number, max_results?: number, orderBy?: string, direction?: SortDirection): Observable<HolderModel<Order>> {
        let params = new HttpParams();

        if (!!page) {
            params = params.append('page', page.toString());
        }
        if (!!max_results) {
            params = params.append('max_results', max_results.toString());
        }
        if (!!orderBy) {
            params = params.append('sort', (direction === 'desc' ? '-' : '') + orderBy);
        }
        return this.httpClient.get<HolderModel<Order>>(this.url, { params: params });
    }

    getOrder(id: number): Observable<Order> {
        return this.httpClient.get<Order>(this.url + '/' + id);
    }

    createOrder(order: Order): Observable<void> {
        return this.httpClient.post<void>(this.url, order);
    }

    updateOrder(order: Order): Observable<void> {
        return this.httpClient.patch<void>(this.url + '/' + order.id, order);
    }
}
