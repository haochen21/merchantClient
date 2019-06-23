import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { SecurityService } from '../../services/security.service';

import { Merchant } from '../../model/Merchant';


const URL = 'https://mp.weixin.qq.com/cgi-bin/showqrcode';

@Component({
    selector: 'modify-qrCode',
    templateUrl: './modify-qrCode.component.html',
    styleUrls: ['./modify-qrCode.component.css']
})
export class ModifyQrCodeComponent implements OnInit, OnDestroy {

    merchant: Merchant = new Merchant();

    qrCodeUrl: String;

    constructor(
        private securityService: SecurityService,
        private router: Router) {
    }

    ngOnInit() {
        this.securityService
            .findMerchant()
            .subscribe(user => {
                console.log(user);
                this.merchant = <Merchant>user;
                if (this.merchant.qrCode) {
                    this.qrCodeUrl = URL + '?ticket=' + encodeURI(this.merchant.qrCode);
                }
            });
    }

    ngOnDestroy() {

    }

    createTicket(event) {
        this.securityService
            .modifyQrCode(this.merchant.id)
            .subscribe(value => {
                console.log(value);
                this.merchant.qrCode = value.ticket;
                this.qrCodeUrl = URL + '?ticket=' + encodeURI(value.ticket);
            });
        event.stopPropagation();
        event.preventDefault();
    }

}