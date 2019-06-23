import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

import { OrderService } from '../services/order.service';
import { SecurityService } from '../services/security.service';

import { Merchant } from '../model/Merchant';
import { OpenRange } from '../model/OpenRange';
import { OpenRangeType } from '../model/OpenRangeType';
import { CartStatus } from '../model/CartStatus';
import { CartFilter } from '../model/CartFilter';

import * as moment from 'moment';

@Component({
  selector: 'merchant-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  tabbarStyle: object = {
    position: 'fixed',
    height: '100%',
    width: '100%',
    top: 0
  };

  merchant: Merchant;

  tabs: OpenRange[] = [];

  selectedIndex: number;

  connection: any;

  openQueryPanel: boolean = false;

  listLayout: boolean = false;

  selectedStatus = { index: 0, name: '' };

  selectedDay = new Date();

  constructor(
    private router: Router,
    private securityService: SecurityService,
    private orderService: OrderService) {
  }

  ngOnInit() {
    this.refresh();
  }

  selectTab(tabz: OpenRange) {
    console.log(tabz);
  }

  refresh() {
    this.tabs = [];
    this.securityService.findOpenRanges()
      .pipe(map(value => {
        this.covertTimeToDate(value.openRanges);
        this.merchant = value;
        this.merchant.openRanges.sort(function (a, b) {
          if (a.beginTime > b.beginTime) {
            return 1;
          }
          if (a.beginTime < b.beginTime) {
            return -1;
          }
          return 0;
        });
        let index = 0;
        for (let openRange of this.merchant.openRanges) {
          if (openRange.type == OpenRangeType.ON) {
            openRange.index = index;
            index++;
            this.tabs.push(openRange);
          }
        }
        // 24 hours
        let beginTime: moment.Moment = moment(this.selectedDay);
        beginTime.hours(0).minutes(0).seconds(0).milliseconds(0);
        let endTime: moment.Moment = moment(this.selectedDay);
        endTime.hours(23).minutes(59).seconds(59).milliseconds(999);
        let range: OpenRange = new OpenRange();
        range.beginTime = beginTime.toDate();
        range.endTime = endTime.toDate();
        range.index = index;
        this.tabs.push(range);

        this.selectedIndex = this.tabs.length - 1;
        let now: Date = this.selectedDay;
        let hasSelectedIndex: boolean = false;
        if (now <= this.tabs[0].beginTime) {
          this.selectedIndex = 0;
          hasSelectedIndex = true;
        }
        if (!hasSelectedIndex) {
          for (let i = 0; i < this.tabs.length - 1; i++) {
            if (now >= this.tabs[i].beginTime && now <= this.tabs[i].endTime) {
              this.selectedIndex = i;
              hasSelectedIndex = true;
              break;
            }
          }
        }
        if (!hasSelectedIndex) {
          for (let i = 0; i < this.tabs.length - 1; i++) {
            if (now > this.tabs[i].endTime) {
              if (i < this.tabs.length - 2) {
                if (now < this.tabs[i + 1].beginTime) {
                  this.selectedIndex = i + 1;
                  break;
                }
              }
            }
          }
        }
        return this.tabs;
      }))
      .subscribe(value => {
        let excueteArray: Array<any> = new Array();
        for (let openRange of this.tabs) {
          excueteArray.push(this.statStatus(openRange));
          excueteArray.push(this.statProduct(openRange));
        }
      });
  }


  statStatus(openRange: OpenRange) {
    let filter: CartFilter = new CartFilter();

    filter.merchantId = this.merchant.id;

    let statuses: Array<CartStatus> = new Array<CartStatus>();
    statuses.push(CartStatus.CONFIRMED);
    statuses.push(CartStatus.DELIVERED);
    filter.statuses = statuses;

    filter.takeBeginTime = openRange.beginTime;
    filter.takeEndTime = openRange.endTime;

    this.orderService.statCartByStatus(filter).subscribe(value => {
      openRange.statusStat = value;
      console.log(value);
    });
  }

  statProduct(openRange: OpenRange) {
    let filter: CartFilter = new CartFilter();

    filter.merchantId = this.merchant.id;

    let statuses: Array<CartStatus> = new Array<CartStatus>();
    statuses.push(CartStatus.CONFIRMED);
    statuses.push(CartStatus.DELIVERED);
    filter.statuses = statuses;

    filter.takeBeginTime = openRange.beginTime;
    filter.takeEndTime = openRange.endTime;

    this.orderService.statCartByProduct(filter)
      .subscribe(value => {
        openRange.products = [];
        for (let product of value) {
          if (openRange.index === this.tabs.length - 1) {
            openRange.products.push(product);
          } else {
            for (let range of product.openRanges) {
              if (range.id === openRange.id) {
                openRange.products.push(product);
                break;
              }
            }
          }
        }
      });
  }

  covertTimeToDate(openRanges: Array<OpenRange>) {
    for (let openRange of openRanges) {
      let beginDate: moment.Moment = moment(openRange.beginTime.toString(), "HH:mm:ss");
      beginDate.dayOfYear(moment(this.selectedDay).dayOfYear());
      let endDate: moment.Moment = moment(openRange.endTime.toString(), "HH:mm:ss");
      endDate.dayOfYear(moment(this.selectedDay).dayOfYear());

      openRange.beginTime = beginDate.toDate();
      openRange.endTime = endDate.toDate();
    }
  }

  openQuery(event) {
    this.openQueryPanel = !this.openQueryPanel;
    event.stopPropagation();
    event.preventDefault();
  }

  selectedOpenRange(event) {
    this.openQueryPanel = false;
    this.selectedIndex = event.value;
    console.log('output radio status: ', JSON.stringify(event));
  }

  selectedOpenDay() {
    this.openQueryPanel = false;
    this.refresh();
  }

  changeListLayout(event) {
    this.listLayout = !this.listLayout;
    event.stopPropagation();
    event.preventDefault();
  }

  currentDateFormat(date, format: string = 'yyyy-mm-dd HH:MM'): any {
    const pad = (n: number): string => (n < 10 ? `0${n}` : n.toString());
    return format
      .replace('yyyy', date.getFullYear())
      .replace('mm', pad(date.getMonth() + 1))
      .replace('dd', pad(date.getDate()))
      .replace('HH', pad(date.getHours()))
      .replace('MM', pad(date.getMinutes()))
      .replace('ss', pad(date.getSeconds()));
  }

  tabBarTabOnPress(pressParam: any) {
    console.log('onPress Params: ', pressParam);
    if (pressParam.key === 'order') {
      this.router.navigate(['/order']);
    } else if (pressParam.key === 'cart') {
      this.router.navigate(['/cart']);
    } else if (pressParam.key === 'product') {
      this.router.navigate(['/product/-1']);
    } else if (pressParam.key === 'my') {
      this.router.navigate(['/my']);
    }
  }
}