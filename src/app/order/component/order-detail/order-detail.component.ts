import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '../../service/order.service';
import { ExchangeService } from '../../../exchange/service/exchange.service';
import { CurrencyService } from '../../../currency/service/currency.service';
import { Exchange } from '../../../exchange/model/exchange.model';
import { Currency } from '../../../currency/model/currency.model';
import { Order } from '../../model/order.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user/service/user.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

    orderForm = new FormGroup({
        exchange: new FormControl('', [Validators.required]),
        side: new FormControl('', [Validators.required]),
        currency: new FormControl('', [Validators.required]),
        quantity: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        tradingViewLink: new FormControl(''),
        tradingViewBody: new FormControl(''),
    });

    currencies: Currency[] = [];
    exchanges: Exchange[] = [];
    sides = [{ name: 'Buy', value: true }, { name: 'Sell', value: false }];

    orderId: number;
    order = new Order();

    readOnly = false;
    
    constructor(private activatedRoute: ActivatedRoute,
        private location: Location,
        private matSnackBar: MatSnackBar,
        private orderService: OrderService,
        private exchangeService: ExchangeService,
        private currencyService: CurrencyService,
        private userService: UserService) { }

    ngOnInit(): void {

        this.orderId = +this.activatedRoute.snapshot.params.order_id;

        this.readOnly = !!this.activatedRoute.snapshot.url.find(urlPart => urlPart.toString() === 'show');

        if (!!this.orderId) {
            this.orderService.getOrder(this.orderId).subscribe((order: Order) => {
                this.order = order;
                this.orderForm.patchValue({
                    exchange: order.exchange,
                    side: order.buy,
                    currency: order.currency,
                    quantity: order.qty,
                    price: order.price,
                    tradingViewLink: 'http://localhost:5000/add',
                    tradingViewBody: '{"order_id": ' + order.id + ', "hash": "1234"}'.toString()
                });
            });
        }

        this.exchangeService.getExchangePage().subscribe(data => this.exchanges = data._items);
        this.currencyService.getCurrencyPage().subscribe(data => this.currencies = data._items);

        if (this.readOnly) {
            this.orderForm.disable();
        }
    }


    upsertOrder() {
        this.order = {
            ...this.order,
            exchange: this.orderForm.get('exchange').value,
            buy: this.orderForm.get('side').value,
            currency: this.orderForm.get('currency').value,
            qty: this.orderForm.get('quantity').value,
            price: this.orderForm.get('price').value,
            user: this.userService.getActualUser().id
        } as Order;
        if (!!this.orderId) {
            this.orderService.updateOrder(this.order).subscribe(() => {
                this.matSnackBar.open('Order updated successfully', '', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'bottom' } as MatSnackBarConfig);
            });
        } else {
            this.orderService.createOrder(this.order).subscribe(() => {
                this.matSnackBar.open('Order created successfully', '', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'bottom' } as MatSnackBarConfig);
            });
        }
    }

    cancel() {
        this.location.back();
    }

}
