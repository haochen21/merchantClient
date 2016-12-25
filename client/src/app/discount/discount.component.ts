import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'

import { Merchant } from '../model/Merchant';
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

    constructor(
        private formBuilder: FormBuilder,
        private securityService: SecurityService,
        private router: Router) {

        this.form = formBuilder.group({
            'discount': ['1.00', ,]
        });
    }

    ngOnInit() {
        this.securityService.findMerchant().then(user => {
            this.merchant = <Merchant>user;
            (<FormControl>this.form.controls['discount']).setValue(this.merchant.discount);
        }).catch(error => {
            console.log(error)
        });
    }

    onSubmit() {
        this.merchant.discount = this.form.value.discount;
        this.securityService.modifyMerchant(this.merchant).then(value => {
            localStorage.setItem('merchant', JSON.stringify(value));
            this.router.navigate(['/my']);
        }).catch(error => {
            console.log(error)
        });
    }
}