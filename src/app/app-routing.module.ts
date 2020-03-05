import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/component/login/login.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'order', loadChildren: () => import('./order/order-routing.module').then(m => m.OrderRoutingModule) },
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
