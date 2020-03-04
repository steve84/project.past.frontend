import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Interceptor } from './base/interceptor';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NoopAnimationsModule,

        UserModule,
        OrderModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
