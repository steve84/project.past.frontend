import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/order/service/order.service';
import { Observable } from 'rxjs';
import { OrderHistory } from 'src/app/order/model/orderhistory.model';
import { HolderModel } from 'src/app/base/model/holder.model';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { SortDirection } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/user/service/user.service';

@Component({
  selector: 'app-order-history-table',
  templateUrl: './order-history-table.component.html',
  styleUrls: ['./order-history-table.component.css']
})
export class OrderHistoryTableComponent implements OnInit {

  data: Observable<HolderModel<OrderHistory>>;
  displayedColumns = ['status', 'order_type', 'exchange', 'currency', 'buy', 'qty', 'price', '_created', '_updated'];

  page = 1;
  max_results = 10;
  orderBy = '_created';
  direction = 'desc' as SortDirection;

  constructor(private datePipe: DatePipe,
              private userService: UserService,
              private orderService: OrderService) { }

  ngOnInit() {
      this.data = this.orderService.getOrderHistoryPage(this.userService.getActualUser().id, this.page, this.max_results, this.orderBy, this.direction);
  }

  onPage(event: PageEvent) {
      this.page = event.pageIndex + 1;
      this.max_results = event.pageSize;
      this.data = this.orderService.getOrderHistoryPage(this.userService.getActualUser().id, this.page, this.max_results, this.orderBy, this.direction);
  }

  onSort(event: Sort) {
      this.orderBy = event.active;
      this.direction = event.direction;
      this.data = this.orderService.getOrderHistoryPage(this.userService.getActualUser().id, this.page, this.max_results, this.orderBy, this.direction);
  }


  getColumnValue(row: OrderHistory, col: string): string {
      switch (col) {
          case 'buy':
              return row.buy ? 'Buy' : 'Sell';
          case '_created':
          case '_updated':
              return this.datePipe.transform(row[col], 'short');
          default:
              return row[col];

      }

  }
}