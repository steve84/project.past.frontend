import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HolderModel } from '../../base/model/holder.model';
import { Order } from '../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = 'http://localhost:5000/order';

  constructor(private httpClient: HttpClient) { }

  getOrderPage(page?: number, max_results?: number): Observable<HolderModel<Order>> {
    let params = new HttpParams();

    if (!!page) {
      params = params.append('page', page.toString());
    }
    if (!!max_results) {
      params = params.append('max_results', max_results.toString());
    }
    return this.httpClient.get<HolderModel<Order>>(this.url, {params: params});
  }
}
