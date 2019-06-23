import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router'

import { Merchant } from '../../model/Merchant';
import { DiscountType } from '../../model/DiscountType';
import { SecurityService } from '../../services/security.service';

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

    selectedStatus = {value: 0, name: '打折'};

    data = [{ value: 0, name: '打折' }, { value: 1, name: '减价' }];

    constructor(
        private formBuilder: FormBuilder,
        private securityService: SecurityService,
        private router: Router) {

        this.form = this.formBuilder.group({
            'discount': ['1.00', ,],
            'amount': ['0.00', ,],
            'minimumOrder': ['', [this.currencyValidator.bind(this)]],
            'packageFee': ['', [this.currencyValidator.bind(this)]]
        });
    }

    ngOnInit() {
        this.securityService.findMerchant()
            .subscribe(user => {
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
                if (this.merchant.minimumOrder) {
                    (<FormControl>this.form.controls['minimumOrder']).setValue(this.merchant.minimumOrder);
                }
                if (this.merchant.packageFee) {
                    (<FormControl>this.form.controls['packageFee']).setValue(this.merchant.packageFee);
                }
            });
    }

    onSubmit() {
        this.merchant.discount = this.form.value.discount;
        this.merchant.amount = this.form.value.amount;
        this.merchant.discountType = this.discountType;
        this.merchant.minimumOrder = this.form.value.minimumOrder;
        this.merchant.packageFee = this.form.value.packageFee;
        this.securityService.modifyMerchant(this.merchant)
            .subscribe(value => {
                localStorage.setItem('merchant', JSON.stringify(value));
                this.router.navigate(['/my']);
            });
    }

    changeDiscountType(event) {
        if (event.value === 0) {
            this.discountType = DiscountType.PERCNET;
            this.isPercent = true;
            this.isAmount = false;
        } else if (event.value === 1) {
            this.discountType = DiscountType.AMOUNT;
            this.isAmount = true;
            this.isPercent = false;
        }
    }

    currencyValidator(control: FormControl) {
        // RFC 2822 compliant regex
        if (typeof control.value !== "function") {
            return null;
        } else if (control.value.match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)) {
            return null;
        } else {
            return { 'invalidCurrency': true };
        }
    }

}