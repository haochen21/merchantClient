import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { SecurityService } from '../core/security.service';

import { Merchant } from '../model/Merchant';


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
            .then(user => {
                console.log(user);
                this.merchant = <Merchant>user;
                if (this.merchant.qrCode) {
                    this.qrCodeUrl = URL + '?ticket='+encodeURI(this.merchant.qrCode);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    ngOnDestroy() {

    }

    createTicket(event) {
        this.securityService
            .modifyQrCode(this.merchant.id)
            .then(value => {
                console.log(value);
                this.merchant.qrCode = value.ticket;
                this.qrCodeUrl = URL +'?ticket='+encodeURI(value.ticket);
            })
            .catch(error => {
                console.log(error);
            });
        event.stopPropagation();
        event.preventDefault();
    }

}