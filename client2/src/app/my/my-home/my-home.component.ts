import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { map, flatMap } from 'rxjs/operators';

import { OrderService } from '../../services/order.service';
import { SecurityService } from '../../services/security.service';
import { WeixinService } from '../../services/weixin.service';

import { Merchant } from '../../model/Merchant';
import { CartStatus } from '../../model/CartStatus';
import { CartFilter } from '../../model/CartFilter';

import * as moment from 'moment';
import * as wx from 'weixin-js-sdk';

@Component({
  selector: 'app-my-home',
  templateUrl: './my-home.component.html',
  styleUrls: ['./my-home.component.css']
})
export class MyHomeComponent implements OnInit { 

  merchant: Merchant = new Merchant();

  cartNumber: number = 0;

  earning: number = 0;

  constructor(
    private router: Router,
    private securityService: SecurityService,
    private orderService: OrderService,
    private weixinService: WeixinService) {
  }

  ngOnInit() {

    this.securityService.findMerchant()
      .pipe(map(user => {
        console.log(user);
        this.merchant = <Merchant>user;
        return user;
      }))
      .pipe(flatMap(user => {
        return this.weixinService.getJsConfig();
      }))
      .subscribe(jsConfig => {
        wx.config(jsConfig);
        wx.ready(function () {
          wx.onMenuShareTimeline({
            title: '店铺公众号', // 分享标题
            link: 'http://b.km086.com/qrcode.html?id=' + this.merchant.id, // 分享链接
            imgUrl: 'http://b.km086.com/assets/images/qrcode_for_gh_869f79b99915_430.jpg', // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });

          wx.onMenuShareAppMessage({
            title: '店铺公众号', // 分享标题
            link: 'http://b.km086.com/qrcode.html?id=' + this.merchant.id, // 分享链接
            imgUrl: 'http://b.km086.com/assets/images/qrcode_for_gh_869f79b99915_430.jpg', // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
        });
        this.statCartNumber();
        this.statCartEarning();
      });


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

    this.orderService.statCartNumberByStatus(filter)
      .subscribe(value => {
        console.log(value);
        this.cartNumber = value.number;
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

    this.orderService.statCartEarningByStatus(filter)
      .subscribe(value => {
        console.log(value);
        this.earning = value.earning;
        if (!this.earning) {
          this.earning = 0;
        }
      });
  }

  logout() {
    this.securityService.logout()
      .subscribe(value => {
        this.router.navigate(['/login']);
      });
  }

}

