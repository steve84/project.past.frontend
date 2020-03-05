import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { AppComponent } from './app.component';
import { HeaderComponent } from './base/component/header/header.component';
import { MenuComponent } from './base/component/menu/menu.component';
import { Interceptor } from './base/interceptor';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        MenuComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NoopAnimationsModule,

        MatToolbarModule,
        MatMenuModule,
        MatButtonModule,
        MatDividerModule,

        UserModule,
        OrderModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
