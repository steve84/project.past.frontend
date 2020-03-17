import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HolderModel } from '../../base/model/holder.model';
import { Order } from '../model/order.model';
import { SortDirection } from '@angular/material/sort';
import { OrderHistory } from '../model/orderhistory.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

    private orderUrl = 'http://localhost:5000/order';
    private orderHistoryUrl = 'http://localhost:5000/order_history';

    constructor(private httpClient: HttpClient) { }

    getOrderPage(userId: number, page?: number, max_results?: number, orderBy?: string, direction?: SortDirection): Observable<HolderModel<Order>> {
        let params = new HttpParams();

        // Show only orders of logged in user
        params = params.append('where', 'user==' + userId);
        // Include entities of foreign tables (not only ids)
        params = params.append('embedded', '{"exchange": 1, "currency": 1, "order_type": 1}');

        if (!!page) {
            params = params.append('page', page.toString());
        }
        if (!!max_results) {
            params = params.append('max_results', max_results.toString());
        }
        if (!!orderBy) {
            params = params.append('sort', (direction === 'desc' ? '-' : '') + orderBy);
        }

        return this.httpClient.get<HolderModel<Order>>(this.orderUrl, { params: params });
    }

    getOrder(id: number): Observable<Order> {
        return this.httpClient.get<Order>(this.orderUrl + '/' + id);
    }

    createOrder(order: Order): Observable<void> {
        return this.httpClient.post<void>(this.orderUrl, order);
    }

    updateOrder(order: Order): Observable<void> {
        return this.httpClient.patch<void>(this.orderUrl + '/' + order.id, order);
    }

    deleteOrder(order: Order): Observable<void> {
        let headers = new HttpHeaders();
        headers = headers.append('If-Match', order._etag)
        return this.httpClient.delete<void>(this.orderUrl + '/' + order.id, {headers});
    }

    getOrderHistoryPage(userId: number, page?: number, max_results?: number, orderBy?: string, direction?: SortDirection): Observable<HolderModel<OrderHistory>> {
        let params = new HttpParams();

        // Show only orders of logged in user
        params = params.append('where', 'user==' + userId);

        if (!!page) {
            params = params.append('page', page.toString());
        }
        if (!!max_results) {
            params = params.append('max_results', max_results.toString());
        }
        if (!!orderBy) {
            params = params.append('sort', (direction === 'desc' ? '-' : '') + orderBy);
        }

        return this.httpClient.get<HolderModel<OrderHistory>>(this.orderHistoryUrl, { params: params });
    }
}
