import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/order/service/order.service';
import { Observable } from 'rxjs';
import { Order } from 'src/app/order/model/order.model';
import { HolderModel } from 'src/app/base/model/holder.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-order-table',
    templateUrl: './order-table.component.html',
    styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit {

    data: Observable<HolderModel<Order>>;
    displayedColumns = ['id', 'buy', 'qty', 'price'];

    page = 1;
    max_results = 10;

    constructor(private orderService: OrderService) { }

    ngOnInit() {
        this.data = this.orderService.getOrderPage(this.page, this.max_results);
    }

    onPage(event: PageEvent) {
        this.page = event.pageIndex + 1;
        this.max_results = event.pageSize;
        this.data = this.orderService.getOrderPage(this.page, this.max_results);
    }

}
