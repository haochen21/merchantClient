import { Component, OnInit, OnDestroy } from '@angular/core';

import * as moment from 'moment';

import { SecurityService } from '../../services/security.service';

import { Merchant } from '../../model/Merchant';
import { OpenRange } from '../../model/OpenRange';
import { OpenRangeType } from '../../model/OpenRangeType';

@Component({
  selector: 'merchant-offtime',
  templateUrl: './offtime.component.html',
  styleUrls: ['./offtime.component.css']
})
export class OffTimeComponent implements OnInit, OnDestroy {

  merchant: Merchant;

  creating: boolean = false;

  hstep: number = 1;
  mstep: number = 1;
  ismeridian: boolean = false;

  tempOpenRange: OpenRange;

  type: OpenRangeType = OpenRangeType.OFF;

  constructor(
    private securityService: SecurityService) { }

  ngOnInit() {
    this.securityService.findOpenRanges()
      .subscribe(value => {
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
      });
  }

  ngOnDestroy() {
  }

  openCreate(event, openRange: OpenRange) {
    this.creating = true;
    if (openRange == null) {
      this.tempOpenRange = new OpenRange();
      this.tempOpenRange.beginTime = new Date();
      this.tempOpenRange.beginTime.setSeconds(0);
      this.tempOpenRange.endTime = new Date();
      this.tempOpenRange.endTime.setSeconds(59);
      this.tempOpenRange.type = this.type;
    } else {
      this.tempOpenRange = openRange;
    }
    event.stopPropagation();
    event.preventDefault();
  }

  create(event) {
    if (!this.merchant.openRanges) {
      this.merchant.openRanges = new Array()
    }
    if (!this.tempOpenRange.id) {
      this.merchant.openRanges.push(this.tempOpenRange);
    }

    this.securityService.createOpenRanges(this.merchant.openRanges)
      .subscribe(value => {
        this.creating = false;
        this.merchant = value;
        this.covertTimeToDate(this.merchant.openRanges);
        this.merchant.openRanges.sort(function (a, b) {
          if (a.beginTime > b.beginTime) {
            return 1;
          }
          if (a.beginTime < b.beginTime) {
            return -1;
          }
          return 0;
        });
      });

    event.stopPropagation();
    event.preventDefault();
  }

  cancel(event) {
    this.creating = false;
    event.stopPropagation();
    event.preventDefault();
  }

  modifyOpen(event) {
    let checkValue = event.checked;
    this.securityService.modifyOpen(checkValue)
      .subscribe(value => {
        console.log(value);
      });
  }

  delete(openRange: OpenRange) {
    this.merchant.openRanges = this.merchant.openRanges.filter(o => o !== openRange);
    this.securityService.createOpenRanges(this.merchant.openRanges)
      .subscribe(value => {
        this.merchant = value;
        this.covertTimeToDate(this.merchant.openRanges);
        this.creating = false;
      });
  }

  modify(openRange: OpenRange) {
    this.merchant.openRanges = this.merchant.openRanges.filter(o => o !== openRange);
    this.securityService.createOpenRanges(this.merchant.openRanges)
      .subscribe(value => {
        this.merchant = value;
        this.covertTimeToDate(this.merchant.openRanges);
        this.creating = false;
      });
  }

  covertTimeToDate(openRanges: Array<OpenRange>) {
    for (let openRange of openRanges) {
      if (openRange.beginTime && openRange.endTime) {
        let beginDate: moment.Moment = moment(openRange.beginTime.toString(), "HH:mm:ss");
        let endDate: moment.Moment = moment(openRange.endTime.toString(), "HH:mm:ss");

        openRange.beginTime = beginDate.toDate();
        openRange.endTime = endDate.toDate();
      }
    }
  }

  currentDateFormat(date, format: string = 'HH:MM'): any {
    const pad = (n: number): string => (n < 10 ? `0${n}` : n.toString());
    return format
      .replace('yyyy', date.getFullYear())
      .replace('mm', pad(date.getMonth() + 1))
      .replace('dd', pad(date.getDate()))
      .replace('HH', pad(date.getHours()))
      .replace('MM', pad(date.getMinutes()))
      .replace('ss', pad(date.getSeconds()));
  }
}