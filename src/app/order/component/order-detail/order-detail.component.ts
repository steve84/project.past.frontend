import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '../../service/order.service';
import { ExchangeService } from '../../../exchange/service/exchange.service';
import { CurrencyService } from '../../../currency/service/currency.service';
import { Exchange } from '../../../exchange/model/exchange.model';
import { Currency } from '../../../currency/model/currency.model';
import { Order } from '../../model/order.model';
import { ActivatedRoute} from '@angular/router';
import { UserService } from 'src/app/user/service/user.service';

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
        price: new FormControl('', [Validators.required])
    });

    currencies: Currency[] = [];
    exchanges: Exchange[] = [];
    sides = [{name: 'Buy', value: true}, {name: 'Sell', value: false}];

    orderId: number;
    order = new Order();

  constructor(private activatedRoute: ActivatedRoute,
              private location: Location,
              private orderService: OrderService,
              private exchangeService: ExchangeService,
              private currencyService: CurrencyService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.orderId = +this.activatedRoute.snapshot.params.order_id;

    if (!!this.orderId) {
        this.orderService.getOrder(this.orderId).subscribe((order: Order) => {
            this.order = order;
            this.orderForm.patchValue({
                exchange: order.exchange,
                side: order.buy,
                currency: order.currency,
                quantity: order.qty,
                price: order.price
            });
        });
    }

    this.exchangeService.getExchangePage().subscribe(data => this.exchanges = data._items);
    this.currencyService.getCurrencyPage().subscribe(data => this.currencies = data._items);
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
        this.orderService.updateOrder(this.order).subscribe(() => {});
    } else {
        this.orderService.createOrder(this.order).subscribe(() => {});
    }
  }

  cancel() {
      this.location.back();
  }

}
