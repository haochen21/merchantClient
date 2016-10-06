import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';

import { OrderService } from '../core/order.service';
import { SecurityService } from '../core/security.service';

import { Merchant } from '../model/Merchant';
import { Cart } from '../model/Cart';
import { CartPage } from '../model/CartPage';
import { CartItem } from '../model/CartItem';
import { CartStatus } from '../model/CartStatus';
import { CartFilter } from '../model/CartFilter';


@Component({
  selector: 'merchant-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.css']
})
export class MyComponent implements OnInit, OnDestroy {

  merchant: Merchant = new Merchant();

  cartNumber: number = 0;

  earning: number = 0;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private securityService: SecurityService) { }

  ngOnInit() {
    document.body.style.backgroundColor = '#f5f5f5';

    this.securityService
      .findUser()
      .then(user => {
        console.log(user);
        this.merchant = <Merchant>user;

        this.statCartNumber();
        this.statCartEarning();
      })
      .catch(error => {
        console.log(error)
      });


  }

  ngOnDestroy() {
    document.body.style.backgroundColor = '#fff';
  }

  statCartNumber() {
    let filter: CartFilter = new CartFilter();

    filter.merchantId = this.merchant.id;

    let beginDate: moment.Moment = moment(new Date());
    beginDate.hours(0).minutes(0).seconds(0).milliseconds(0);
    let takeBeginTimeAfter: Date = beginDate.toDate();
    filter.takeBeginTimeAfter = takeBeginTimeAfter;

    let endDate: moment.Moment = moment(new Date());
    endDate.hours(23).minutes(59).seconds(59).milliseconds(999);
    let takeBeginTimeBefore: Date = endDate.toDate();
    filter.takeBeginTimeBefore = takeBeginTimeBefore;

    let statuses: Array<CartStatus> = new Array<CartStatus>();
    statuses.push(CartStatus.CONFIRMED);
    statuses.push(CartStatus.DELIVERED);
    filter.statuses = statuses;

    this.orderService.statCartNumberByStatus(filter).then(value => {
      console.log(value);
      this.cartNumber = value.number;
    }).catch(error => {
      Promise.reject("error");
    });
  }

  statCartEarning() {
    let filter: CartFilter = new CartFilter();

    filter.merchantId = this.merchant.id;

    let beginDate: moment.Moment = moment().startOf('month');
    beginDate.hours(0).minutes(0).seconds(0).milliseconds(0);
    let takeBeginTimeAfter: Date = beginDate.toDate();
    filter.takeBeginTimeAfter = takeBeginTimeAfter;

    let endDate: moment.Moment = moment().endOf('month');
    endDate.hours(23).minutes(59).seconds(59).milliseconds(999);
    let takeBeginTimeBefore: Date = endDate.toDate();
    filter.takeBeginTimeBefore = takeBeginTimeBefore;

    let statuses: Array<CartStatus> = new Array<CartStatus>();
    statuses.push(CartStatus.CONFIRMED);
    statuses.push(CartStatus.DELIVERED);
    filter.statuses = statuses;

    filter.weixinPaid = true;

    filter.needPay = true;

    this.orderService.statCartEarningByStatus(filter).then(value => {
      console.log(value);
      this.earning = value.earning;
      if (!this.earning) {
        this.earning = 0;
      }
    }).catch(error => {
      Promise.reject("error");
    });
  }

  logout() {
    this.securityService.logout().then(value => {
      this.router.navigate(['/login']);
    }).catch(error => {
      console.log("error");
    });
  }
}