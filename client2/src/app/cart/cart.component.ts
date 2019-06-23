import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';

import { OrderService } from '../services/order.service';
import { SecurityService } from '../services/security.service';

import { Merchant } from '../model/Merchant';
import { Cart } from '../model/Cart';
import { CartPage } from '../model/CartPage';
import { CartStatus } from '../model/CartStatus';
import { CartFilter } from '../model/CartFilter';

@Component({
    selector: 'merchant-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    tabbarStyle: object = {
        position: 'fixed',
        height: '100%',
        width: '100%',
        top: 0
    };

    merchant: Merchant;

    navbarFormOpen: boolean = false;

    queryOrder: any = {
        cartId: ''
    };

    cartPage: CartPage = new CartPage();

    filter: CartFilter;

    size: number = 5;

    connection: any;

    constructor(
        private router: Router,
        private orderService: OrderService,
        private securityService: SecurityService) {

    }

    ngOnInit() {
        //document.body.style.backgroundColor = '#f2f0f0';
        this.securityService.findMerchant()
            .subscribe(dbMerchant => {
                this.merchant = dbMerchant;
                this.refresh();
            });
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

    refresh() {
        this.filter = new CartFilter();

        this.filter.merchantId = this.merchant.id;

        let beginDate: moment.Moment = moment(new Date());
        beginDate.hours(0).minutes(0).seconds(0).milliseconds(0);
        let createTimeAfter: Date = beginDate.toDate();
        this.filter.createTimeAfter = createTimeAfter;

        let endDate: moment.Moment = moment(new Date());
        endDate.hours(23).minutes(59).seconds(59).milliseconds(999);
        let createTimeBefore: Date = endDate.toDate();
        this.filter.createTimeBefore = createTimeBefore;

        let statuses: Array<CartStatus> = new Array<CartStatus>();
        statuses.push(CartStatus.CONFIRMED);
        this.filter.statuses = statuses;

        this.filter.page = 0;
        this.filter.size = this.size;

        this.queryByFilter();
    }

    navbarFormOpenClick() {
        this.navbarFormOpen = !this.navbarFormOpen;
    }

    onQueryOrder() {
        this.navbarFormOpenClick();
        console.log(this.queryOrder);

        this.filter = new CartFilter();
        this.filter.merchantId = this.merchant.id;

        let beginDate: moment.Moment = moment(new Date());
        beginDate.hours(0).minutes(0).seconds(0).milliseconds(0);
        let createTimeAfter: Date = beginDate.toDate();
        this.filter.createTimeAfter = createTimeAfter;

        let endDate: moment.Moment = moment(new Date());
        endDate.hours(23).minutes(59).seconds(59).milliseconds(999);
        let createTimeBefore: Date = endDate.toDate();
        this.filter.createTimeBefore = createTimeBefore;

        let statuses: Array<CartStatus> = new Array<CartStatus>();
        statuses.push(CartStatus.CONFIRMED);
        this.filter.statuses = statuses;

        this.filter.cartId = this.queryOrder.cartId;

        this.filter.page = 0;
        this.filter.size = this.size;

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

    print(cart: Cart) {
        this.orderService.print(cart.id).subscribe();
    }

    tabBarTabOnPress(pressParam: any) {
        console.log('onPress Params: ', pressParam);
        if (pressParam.key === 'order') {
            this.router.navigate(['/order']);
        } else if (pressParam.key === 'cart') {
            this.router.navigate(['/cart']);
        } else if (pressParam.key === 'product') {
            this.router.navigate(['/product/-1']);
        } else if (pressParam.key === 'my') {
            this.router.navigate(['/my']);
        }
    }
}