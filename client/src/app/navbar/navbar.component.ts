import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SecurityService } from '../core/security.service';

import { Cart } from '../model/Cart';

@Component({
    selector: 'ticket-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    isProduct: boolean;
    isCart: boolean;
    isOrder: boolean;
    isMy: boolean;

    totalItem: number = 0;

    constructor(
        private router: Router,
        private securityService: SecurityService) {
    }

    ngOnInit() {
        this.isProduct = false;
        this.isCart = false;
        this.isOrder = false;
        this.isMy = false;

        this.getMenuNameActive();

    }

    ngOnDestroy() {
       
    }

    menuClick(menuName: string) {
        this.securityService.setMenuName(menuName);
        if (this.securityService.getMenuName() === 'product') {
             this.router.navigate(['/product/-1']);
        } else if (this.securityService.getMenuName() === 'cart') {
           this.router.navigate(['/cart']);
        } else if (this.securityService.getMenuName() === 'order') {
            this.router.navigate(['/order']);
        } else if (this.securityService.getMenuName() === 'my') {
            this.router.navigate(['/my']);
        }
    }

    getMenuNameActive() {
        this.isProduct = false;
        this.isCart = false;
        this.isOrder = false;
        this.isMy = false;
        if (this.securityService.getMenuName() === 'product') {
            this.isProduct = true;
        } else if (this.securityService.getMenuName() === 'cart') {
            this.isCart = true;
        } else if (this.securityService.getMenuName() === 'order') {
            this.isOrder = true;
        } else if (this.securityService.getMenuName() === 'my') {
            this.isMy = true;
        }
    }

}