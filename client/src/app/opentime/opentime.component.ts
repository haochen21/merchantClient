import { Component, OnInit, OnDestroy } from '@angular/core';

import * as moment from 'moment';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { TimepickerComponent } from 'ng2-bootstrap/ng2-bootstrap';

import { SecurityService } from '../core/security.service';

import { Merchant } from '../model/Merchant';
import { OpenRange } from '../model/OpenRange';

@Component({
  selector: 'merchant-opentime',
  templateUrl: './opentime.component.html',
  styleUrls: ['./opentime.component.css']
})
export class OpenTimeComponent implements OnInit, OnDestroy {

  merchant: Merchant;

  creating: boolean = false;

  hstep: number = 1;
  mstep: number = 1;
  ismeridian: boolean = false;

  beginTime: Date = new Date();
  endTime: Date = new Date();

  constructor(
    private securityService: SecurityService,
    private slimLoader: SlimLoadingBarService) { }

  ngOnInit() {
    this.slimLoader.start();
    this.securityService.findOpenRanges().then(value => {
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
      this.slimLoader.complete();
    }).catch(error => {
      console.log(error);
      this.slimLoader.complete();
    });
  }

  ngOnDestroy() {
  }

  openCreate(event) {
    this.creating = true;
    event.stopPropagation();
    event.preventDefault();
  }

  create(event) {
    this.slimLoader.start();
    let range: OpenRange = new OpenRange();
    this.beginTime.setSeconds(0);
    this.endTime.setSeconds(59);
    range.beginTime = this.beginTime;
    range.endTime = this.endTime;

    if (!this.merchant.openRanges) {
      this.merchant.openRanges = new Array()
    }
    this.merchant.openRanges.push(range);

    this.securityService.createOpenRanges(this.merchant.openRanges).then(value => {
      this.creating = false;
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
      this.slimLoader.complete();
    }).catch(error => {
      console.log(error);
      this.slimLoader.complete();
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
    this.securityService.modifyOpen(checkValue).then(value => {
      console.log(value);
    }).catch(error => {
      console.log(error);
    });
  }

  delete(openRange: OpenRange) {
    this.merchant.openRanges = this.merchant.openRanges.filter(o => o !== openRange);
    this.securityService.createOpenRanges(this.merchant.openRanges).then(value => {
      this.merchant = value;
      this.creating = false;
    }).catch(error => {
      console.log(error);
    });
  }

  covertTimeToDate(openRanges: Array<OpenRange>) {
    for (let openRange of openRanges) {
      let beginDate: moment.Moment = moment(openRange.beginTime.toString(), "HH:mm:ss");
      let endDate: moment.Moment = moment(openRange.endTime.toString(), "HH:mm:ss");

      openRange.beginTime = beginDate.toDate();
      openRange.endTime = endDate.toDate();
    }
  }
}