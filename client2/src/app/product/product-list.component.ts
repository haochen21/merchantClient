import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as moment from 'moment';

import { map, flatMap } from 'rxjs/operators';

import { ProductService } from '../services/product.service';

import { Category } from '../model/Category';
import { Product } from '../model/Product';
import { ProductStatus } from '../model/ProductStatus';
import { OpenRange } from '../model/OpenRange';

@Component({
    selector: 'product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    categorys: Array<Category>;

    products: Array<Product>;

    imagePreUrl: string = this.productService.imagePreUrl;

    selectedCategoryId: number = -1;

    private sub: any;

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() {
        let categoryId = +this.route.snapshot.params.categoryId;
        this.productService.findCategoryByMerchant()
            .pipe(flatMap(value => {
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
                //add other for product which has not a category
                let other: Category = new Category();
                other.id = -1;
                other.name = '其它';
                this.categorys.push(other);
                //default category 
                for (let category of this.categorys) {
                    if (categoryId === -1) {
                        this.selectedCategoryId = category.id;
                        break;
                    } else if (category.id === categoryId) {
                        this.selectedCategoryId = category.id;
                        break;
                    }
                }
                console.log(value);
                return this.productService.findProductByMerchant();
            }))
            .pipe(map(value => {
                this.products = value;
                for (let category of this.categorys) {
                    let productOfCategory = this.products.filter(p => {
                        if (category.id === -1 && !p.category) {
                            return true;
                        } else if (p.category && p.category.id == category.id) {
                            return true;
                        }
                    });
                    category.products = productOfCategory;
                    category.products.sort(function (a, b) {
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
                }
                console.log(value);
            }))
            .subscribe();
    }

    changeProductStatus(event: any, p: Product) {
        if (event.checked) {
            p.status = ProductStatus.ONLINE;
        } else {
            p.status = ProductStatus.OFFLINE;
        }
    }

    modify(id: number) {
        this.router.navigate(['/product/create', id]);
    }

    update(p: Product) {
        this.covertOpenRangeToDate(p.openRanges);
        this.productService.modifyProduct(p).subscribe(value => {
            console.log(value);
        });
    }

    delete(p: Product) {
        this.covertOpenRangeToDate(p.openRanges);
        p.status = ProductStatus.DELETE;
        this.productService.modifyProduct(p).subscribe(value => {
            this.products = this.products.filter(temp => {
                if (temp.id !== p.id) {
                    return true;
                } else {
                    return false;
                }
            });
            for (let category of this.categorys) {
                let productOfCategory = this.products.filter(p => {
                    if (category.id === -1 && !p.category) {
                        return true;
                    } else if (p.category && p.category.id == category.id) {
                        return true;
                    }
                });
                category.products = productOfCategory;
            }
        });
    }

    covertOpenRangeToDate(openRanges: Array<OpenRange>) {
        for (let openRange of openRanges) {
            let beginDate: moment.Moment = moment(openRange.beginTime.toString(), "HH:mm:ss");
            let endDate: moment.Moment = moment(openRange.endTime.toString(), "HH:mm:ss");
            openRange.beginTime = beginDate.toDate();
            openRange.endTime = endDate.toDate();
        }
    }

    onTabClick(item) {
        console.log('onTabClick', item);
      }
} 