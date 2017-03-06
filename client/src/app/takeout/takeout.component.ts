import { Component, OnInit, OnDestroy } from '@angular/core';

import * as moment from 'moment';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { SecurityService } from '../core/security.service';

import { Merchant } from '../model/Merchant';

@Component({
  selector: 'merchant-takeout',
  templateUrl: './takeout.component.html',
  styleUrls: ['./takeout.component.css']
})
export class TakeOutComponent implements OnInit, OnDestroy {

  merchant: Merchant;

  constructor(
    private securityService: SecurityService,
    private slimLoader: SlimLoadingBarService) { }

  ngOnInit() {
    this.slimLoader.start();
    this.securityService.findOpenRanges().then(value => {
      this.merchant = value;
      this.slimLoader.complete();
    }).catch(error => {
      console.log(error);
      this.slimLoader.complete();
    });
  }

  ngOnDestroy() {
  }

  modifyTakeOut(event) {
    let checkValue = event.checked;
    this.securityService.modifyTakeOut(checkValue).then(value => {
      console.log(value);
    }).catch(error => {
      console.log(error);
    });
  }
}