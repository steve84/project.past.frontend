import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/order/service/order.service';
import { Observable } from 'rxjs';
import { Order } from 'src/app/order/model/order.model';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-order-table',
    templateUrl: './order-table.component.html',
    styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit {

    data: Observable<Order[]>;
    displayedColumns = ['id', 'buy', 'qty', 'price'];

    constructor(private orderService: OrderService) { }

    ngOnInit() {
        this.data = this.orderService.getOrders().pipe(
            map(data => data['_items'])
        );
    }

}
