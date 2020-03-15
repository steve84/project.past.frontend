import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/order/service/order.service';
import { Observable } from 'rxjs';
import { Order } from 'src/app/order/model/order.model';
import { HolderModel } from 'src/app/base/model/holder.model';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { SortDirection } from '@angular/material/sort';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/user/service/user.service';

@Component({
    selector: 'app-order-table',
    templateUrl: './order-table.component.html',
    styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit {

    data: Observable<HolderModel<Order>>;
    displayedColumns = ['id', 'exchange', 'currency', 'buy', 'qty', 'price', '_created', '_updated', 'actions'];

    page = 1;
    max_results = 10;
    orderBy = 'id';
    direction = 'asc' as SortDirection;

    constructor(private router: Router,
                private datePipe: DatePipe,
                private userService: UserService,
                private orderService: OrderService) { }

    ngOnInit() {
        this.data = this.orderService.getOrderPage(this.userService.getActualUser().id, this.page, this.max_results, this.orderBy, this.direction);
    }

    onPage(event: PageEvent) {
        this.page = event.pageIndex + 1;
        this.max_results = event.pageSize;
        this.data = this.orderService.getOrderPage(this.userService.getActualUser().id, this.page, this.max_results, this.orderBy, this.direction);
    }

    onSort(event: Sort) {
        this.orderBy = event.active;
        this.direction = event.direction;
        this.data = this.orderService.getOrderPage(this.userService.getActualUser().id, this.page, this.max_results, this.orderBy, this.direction);
    }

    editOrder(order: Order) {
        this.router.navigate(['order', order.id]);
    }

    deleteOrder(order: Order) {}


    getColumnValue(row: Order, col: string): string {
        switch (col) {
            case 'exchange':
                return row.exchange['name'];
            case 'currency':
                return row.currency['name'];
            case 'buy':
                return row.buy ? 'Buy' : 'Sell';
            case '_created':
            case '_updated':
                return this.datePipe.transform(row[col], 'dd.MM.yyyy HH:mm');
            default:
                return row[col];

        }

    }


}
