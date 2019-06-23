import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../../services/product.service';

import { Category } from '../../model/Category';
import { Merchant } from '../../model/Merchant';

@Component({
    selector: 'cateogry',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

    merchant: Merchant;

    categorys: Array<Category> = [];

    hasInit: boolean = false;

    constructor(
        private productService: ProductService,
        private router: Router) {

    }

    ngOnInit() {
        this.productService.findCategoryByMerchant()
            .subscribe(value => {
                this.categorys = value;
                this.categorys.sort(function (a, b) {
                    if (a.sequence == null) {
                        return 1;
                    }
                    if (b.sequence == null) {
                        return -1;
                    }
                    if (a.sequence > b.sequence) {
                        return 1;
                    }
                    if (a.sequence < b.sequence) {
                        return -1;
                    }
                    return 0;
                });
                this.hasInit = true;
            });
    }

    delete(event,id: number) {
        event.stopPropagation();
        event.preventDefault();
        this.productService.deleteCategory(id)
            .subscribe(value => {
                if (value.result) {
                    this.categorys = this.categorys.filter(c => c.id !== id);
                }
            });
    }

    modify(event,id: number) {
        this.router.navigate(['/my/modifyCategory/' + id]);
        event.stopPropagation();
        event.preventDefault();
    }
}