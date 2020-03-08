import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrderTableComponent } from './component/table/order-table/order-table.component';
import { OrderService } from './service/order.service';
import { OrderRoutingModule } from './order-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
    declarations: [
        OrderTableComponent
    ],
    imports: [
        OrderRoutingModule,
        CommonModule,
        MatTableModule,
        MatPaginatorModule
    ],
    providers: [
        OrderService
    ]
})
export class OrderModule { }
