import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/component/login/login.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'order', loadChildren: './order/order-routing.module#OrderRoutingModule' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
