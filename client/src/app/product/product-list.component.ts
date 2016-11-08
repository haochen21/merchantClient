import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as moment from 'moment';

import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { StoreService } from '../core/store.service';
import { SecurityService } from '../core/security.service';

import { Merchant } from '../model/Merchant';
import { Category } from '../model/Category';
import { Product } from '../model/Product';
import { ProductStatus } from '../model/ProductStatus';
import { OpenRange } from '../model/OpenRange';

@Component({
    selector: 'product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

    categorys: Array<Category>;

    products: Array<Product>;

    imagePreUrl: string = this.storeService.imagePreUrl;

    selectedCategoryId: number = -1;

    private sub: any;

    constructor(
        private storeService: StoreService,
        private securityService: SecurityService,
        private route: ActivatedRoute,
        private router: Router,
        private toastyService: ToastyService,
        private toastyConfig: ToastyConfig,
        private slimLoader: SlimLoadingBarService) {
        this.toastyConfig.theme = 'material';
    }

    ngOnInit() {
        this.slimLoader.start();

        this.sub = this.route.params.subscribe(params => {
            let categoryId = +params['categoryId']; // (+) converts string 'id' to a number
            this.storeService.findCategoryByMerchant().then(value => {
                this.categorys = value;
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
                return this.storeService.findProductByMerchant();
            }).then(value => {
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
                }
                console.log(value);
                this.slimLoader.complete();
            }).catch(error => {
                console.log(error);
            });
        });



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
        this.slimLoader.color = 'red';
        this.slimLoader.start();
        this.covertOpenRangeToDate(p.openRanges);
        this.storeService.modifyProduct(p).then(value => {
            console.log(value);
            p = value;
            this.addToast(p, '更新成功');
            this.slimLoader.complete();
        }).catch(error => {
            console.log(error);
        });
    }

    delete(p: Product) {
        this.slimLoader.color = 'red';
        this.slimLoader.start();
        this.covertOpenRangeToDate(p.openRanges);
        p.status = ProductStatus.DELETE;
        this.storeService.modifyProduct(p).then(value => {
            this.products = this.products.filter(temp => {
                if(temp.id !== p.id){
                    return true;
                }else {
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
            this.addToast(p, '删除成功');
            this.slimLoader.complete();
        }).catch(error => {
            console.log(error);
        });
    }

    addToast(p: Product, title: string) {
        var toastOptions: ToastOptions = {
            title: title,
            msg: p.name + title,
            showClose: true,
            timeout: 5000,
            theme: "material",
            onAdd: (toast: ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function (toast: ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
            }
        };
        this.toastyService.success(toastOptions);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    covertOpenRangeToDate(openRanges: Array<OpenRange>) {
        for (let openRange of openRanges) {
            let beginDate: moment.Moment = moment(openRange.beginTime.toString(), "HH:mm:ss");
            let endDate: moment.Moment = moment(openRange.endTime.toString(), "HH:mm:ss");
            openRange.beginTime = beginDate.toDate();
            openRange.endTime = endDate.toDate();
        }
    }

} 