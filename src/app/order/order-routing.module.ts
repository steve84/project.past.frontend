import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderTableComponent } from './component/table/order-table/order-table.component';
import { OrderDetailComponent } from './component/order-detail/order-detail.component';


const orderRoutes: Routes = [
    { path: 'list', component: OrderTableComponent },
    { path: 'add', component: OrderDetailComponent },
    { path: ':order_id', component: OrderDetailComponent }
];


@NgModule({
    imports: [
        RouterModule.forChild(orderRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class OrderRoutingModule { }