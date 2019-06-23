import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import * as moment from 'moment';

import { OrderService } from '../../services/order.service';
import { SecurityService } from '../../services/security.service';

import { Merchant } from '../../model/Merchant';
import { Cart } from '../../model/Cart';
import { CartPage } from '../../model/CartPage';
import { CartStatus } from '../../model/CartStatus';
import { CartFilter } from '../../model/CartFilter';

@Component({
    selector: 'merchant-hiscart',
    templateUrl: './hiscart.component.html',
    styleUrls: ['./hiscart.component.css']
})
export class HisCartComponent implements OnInit {

    merchant: Merchant;

    openQueryPanel: boolean = false;

    form: FormGroup;

    date: Date = new Date();

    filter: CartFilter;

    size: number = 8;

    cartPage: CartPage = new CartPage();

    constructor(
        private formBuilder: FormBuilder,
        private orderService: OrderService,
        private securityService: SecurityService) {
    }

    ngOnInit() {
        this.securityService.findMerchant()
            .subscribe(user => {
                this.merchant = <Merchant>user;
                let queryDate: moment.Moment = moment(this.date);
                let queryDateStr = queryDate.format('YYYY-MM-DD');

                this.filter = new CartFilter();
                this.filter.merchantId = this.merchant.id;

                this.form = this.formBuilder.group({
                    'date': [queryDateStr],
                    'cartId': [],
                    'confirmed': [false],
                    'delivered': [true]
                });

                this.setQueryTimeValue();
                this.onSubmit();
            });
    }

    openQuery() {
        this.openQueryPanel = !this.openQueryPanel;
    }

    changeQueryDate(event) {
        let queryDate: moment.Moment = moment(this.form.value.date, 'YYYY-MM-DD');
        this.date = queryDate.toDate();
        this.setQueryTimeValue();
    }

    setQueryTimeValue() {
        let beginDate: moment.Moment = moment(this.date);
        beginDate.hours(0).minutes(0).seconds(0).milliseconds(0);
        let createTimeAfter: Date = beginDate.toDate();
        this.filter.createTimeAfter = createTimeAfter;

        let endDate: moment.Moment = moment(this.date);
        endDate.hours(23).minutes(59).seconds(59).milliseconds(999);
        let createTimeBefore: Date = endDate.toDate();
        this.filter.createTimeBefore = createTimeBefore;
    }

    onSubmit() {
        this.openQueryPanel = false;
        let statuses: Array<CartStatus> = new Array<CartStatus>();

        this.filter.statuses = statuses;
        if (this.form.value.confirmed) {
            statuses.push(CartStatus.CONFIRMED);
        }
        if (this.form.value.delivered) {
            statuses.push(CartStatus.DELIVERED);
        }

        if (this.form.value.cartId) {
            this.filter.cartId = this.form.value.cartId;
            (<FormControl>this.form.controls['cartId']).setValue('');
        } else {
            this.filter.no = null;
        }

        this.filter.page = 0;
        this.filter.size = this.size;

        console.log(this.filter);

        this.queryByFilter();
    }

    queryByFilter() {
        this.orderService.pageCartByFilter(this.filter)
            .subscribe(value => {
                this.cartPage = value;
                console.log(this.cartPage);
                this.filter.page = this.filter.page + 1;
            });
    }

    queryNextPage() {
        this.queryByFilter();
    }

    getProductNumber(cart: Cart) {
        let number: number = 0;
        for (let i = 0; i < cart.cartItems.length; i++) {
            number += cart.cartItems[i].quantity;
        }
        return number;
    }

    showDetail(cart: Cart) {
        if (cart.showDetail) {
            cart.showDetail = false;
        } else {
            cart.showDetail = true;
        }
    }
}
