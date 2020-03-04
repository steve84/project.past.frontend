import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderTableComponent } from './component/table/order-table/order-table.component';


const orderRoutes: Routes = [
    { path: '', component: OrderTableComponent }
];


@NgModule({
    imports: [
        RouterModule.forRoot(orderRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class OrderRoutingModule { }