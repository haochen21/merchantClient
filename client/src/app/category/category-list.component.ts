import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { StoreService } from '../core/store.service';
import { SecurityService } from '../core/security.service';

import { Category } from '../model/Category';
import { Merchant } from '../model/Merchant';

@Component({
    selector: 'cateogry',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit, OnDestroy {

    merchant: Merchant;

    categorys: Array<Category> = [];

    hasInit: boolean = false;

    constructor(
        private storeService: StoreService,
        private securityService: SecurityService,
        private route: ActivatedRoute,
        private router: Router,
        private slimLoader: SlimLoadingBarService) {

    }

    ngOnInit() {
        document.body.style.backgroundColor = '#f2f0f0';
        this.slimLoader.start();

        this.storeService.findCategoryByMerchant().then(value => {
            this.categorys = value;
            console.log(value);
            this.slimLoader.complete();
            this.hasInit = true;
        }).catch(error => {
            console.log(error);
            this.slimLoader.complete();
        });
    }

    ngOnDestroy() {
        document.body.style.backgroundColor = '';
    }

    delete(id: number) {
        this.slimLoader.start();
        this.storeService.deleteCategory(id).then(value => {
            if (value.result) {
                this.categorys = this.categorys.filter(c => c.id !== id);
            }
            this.slimLoader.complete();
        }).catch(error => {
            console.log(error);
            this.slimLoader.complete();
        });
    }

    modify(id: number) {
        this.router.navigate(['/category/modify', id]);
    }
}