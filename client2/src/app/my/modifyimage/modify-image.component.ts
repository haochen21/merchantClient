import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { FileUploader } from 'ng2-file-upload';

import { SecurityService } from '../../services/security.service';

import { Merchant } from '../../model/Merchant';

const URL = 'http://shop.km086.com:8080/ticketServer/security/merchant/image';
//const URL = 'http://127.0.0.1:8080/ticketServer/security/merchant/image';

@Component({
    selector: 'modify-image',
    templateUrl: './modify-image.component.html',
    styleUrls: ['./modify-image.component.css']
})
export class ModifyImageComponent implements OnInit, OnDestroy {

    merchant: Merchant = new Merchant();

    uploader: FileUploader = new FileUploader({ url: URL });

    fileSize: number = 5;

    imageUrl: string;

    stockDescription: string;

    private sub: any;

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
                if (this.merchant.imageSource) {
                    this.imageUrl = URL + '/' + this.merchant.imageSource + '-md/?' + new Date().getTime();
                }
            });
        this.uploader.onBuildItemForm = (item, form) => {
            form.append("merchantId", this.merchant.id);
        };
        var _parent = this;
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            _parent.goToMy();
        };
    }

    ngOnDestroy() {

    }

    goToMy() {
        this.router.navigate(['/my']);
    }
}