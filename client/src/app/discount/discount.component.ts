import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'

import { Merchant } from '../model/Merchant';
import { DiscountType } from '../model/DiscountType';
import { ValidationService } from '../core/validation.service';
import { SecurityService } from '../core/security.service';

@Component({
    selector: 'discount',
    templateUrl: './discount.component.html',
    styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {

    merchant: Merchant = new Merchant();

    form: FormGroup;

    discountType: DiscountType;

    isPercent: boolean = false;

    isAmount: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private securityService: SecurityService,
        private router: Router) {

        this.form = formBuilder.group({
            'discount': ['1.00', ,],
            'amount': ['0.00', ,]
        });
    }

    ngOnInit() {
        this.securityService.findMerchant().then(user => {
            this.merchant = <Merchant>user;
            this.discountType = this.merchant.discountType;
            if (this.discountType == DiscountType.PERCNET) {
                this.isPercent = true;
            } else if (this.discountType == DiscountType.AMOUNT) {
                this.isAmount = true;
            }
            if (this.merchant.discount) {
                (<FormControl>this.form.controls['discount']).setValue(this.merchant.discount);
            }
            if (this.merchant.amount) {
                (<FormControl>this.form.controls['amount']).setValue(this.merchant.amount);
            }
        }).catch(error => {
            console.log(error)
        });
    }

    onSubmit() {
        this.merchant.discount = this.form.value.discount;
        this.merchant.amount = this.form.value.amount;
        this.merchant.discountType = this.discountType;
        this.securityService.modifyMerchant(this.merchant).then(value => {
            localStorage.setItem('merchant', JSON.stringify(value));
            this.router.navigate(['/my']);
        }).catch(error => {
            console.log(error)
        });
    }

    changeDiscountType(event) {
        if (event.value === '打折') {
            this.discountType = DiscountType.PERCNET;
            this.isPercent = true;
            this.isAmount = false;
        } else if (event.value === '减价') {
            this.discountType = DiscountType.AMOUNT;
            this.isAmount = true;
            this.isPercent = false;
        }
    }

}