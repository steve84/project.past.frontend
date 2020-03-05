import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HolderModel } from '../../base/model/holder.model';
import { Order } from '../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  getOrders(): Observable<HolderModel<Order>> {
    return this.httpClient.get<HolderModel<Order>>('http://localhost:5000/order');
  }
}
