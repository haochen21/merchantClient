import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';

import { SecurityService } from '../../services/security.service';

import { Merchant } from '../../model/Merchant';

const URL = 'http://shop.km086.com:8080/ticketServer/store/upload/excel';
//const URL = 'http://127.0.0.1:8080/ticketServer/store/upload/excel';

@Component({
    selector: 'upload-product',
    templateUrl: './upload-product.component.html',
    styleUrls: ['./upload-product.component.css']
})
export class UploadProductComponent implements OnInit {

    merchant: Merchant = new Merchant();

    uploader: FileUploader = new FileUploader({ url: URL });

    fileSize: number = 1;

    constructor(
        private securityService: SecurityService,
        private router: Router,
        private toastr: ToastrService) {
    }

    ngOnInit() {

        this.securityService
            .findMerchant()
            .subscribe(user => {
                console.log(user);
                this.merchant = <Merchant>user;
            });
        this.uploader.onBuildItemForm = (item, form) => {
            form.append("merchantId", this.merchant.id);
        };
        var _parent = this;
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            console.log(response);
            if (response === 'success') {
                this.toastr.success("上传成功", "上传成功");
            } else {
                this.toastr.error("上传失败", "上传失败");
            }
            _parent.goToMy();
        };
    }

    ngOnDestroy() {

    }

    goToMy() {
        this.router.navigate(['/my']);
    }
}