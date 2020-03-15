import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrderTableComponent } from './component/table/order-table/order-table.component';
import { OrderService } from './service/order.service';
import { OrderRoutingModule } from './order-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { OrderDetailComponent } from './component/order-detail/order-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        OrderTableComponent,
        OrderDetailComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        OrderRoutingModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatRadioModule,
        MatSortModule,
        MatIconModule
    ],
    providers: [
        DatePipe,
        OrderService
    ]
})
export class OrderModule { }
