import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrderTableComponent } from './component/table/order-table/order-table.component';
import { OrderService } from './service/order.service';
import { OrderRoutingModule } from './order-routing.module';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    declarations: [
        OrderTableComponent
    ],
    imports: [
        OrderRoutingModule,
        CommonModule,
        MatTableModule
    ],
    providers: [
        OrderService
    ]
})
export class OrderModule { }
