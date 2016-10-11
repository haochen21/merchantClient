import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { FileUploader } from 'ng2-file-upload';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { ValidationService } from '../core/validation.service';
import { StoreService } from '../core/store.service';
import { SecurityService } from '../core/security.service';

import { Merchant } from '../model/Merchant';
import { Category } from '../model/Category';
import { Product } from '../model/Product';
import { ProductStatus } from '../model/ProductStatus';


const URL = 'http://shop.km086.com:8080/ticketServer/store/product/image';

@Component({
    selector: 'product-create',
    templateUrl: './product-create.component.html',
    styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit, OnDestroy {

    form: FormGroup;

    status = ['销售', '下架'];

    categorys: Array<Category>;

    product: Product = new Product();

    isCreated: boolean = false;

    uploader: FileUploader = new FileUploader({ url: URL });

    fileSize: number = 5;

    URL: string = this.storeService.imagePreUrl;

    imageUrl: string;

    stockDescription: string;

    private sub: any;

    constructor(
        private formBuilder: FormBuilder,
        private storeService: StoreService,
        private securityService: SecurityService,
        private route: ActivatedRoute,
        private router: Router,
        private toastyService: ToastyService,
        private toastyConfig: ToastyConfig,
        private slimLoader: SlimLoadingBarService) {

        this.toastyConfig.theme = 'material';

        this.form = formBuilder.group({
            'name': ['', [Validators.minLength(2), Validators.maxLength(20)]],
            'unitPrice': ['', [Validators.required, ValidationService.currencyValidator]],
            'description': ['', [Validators.minLength(4), Validators.maxLength(255)]],
            'unitsInStock': ['0', [Validators.required, ValidationService.numberValidator]],
            'payTimeLimit': ['10', [Validators.required, ValidationService.timeValidator]],
            'takeTimeLimit': ['0', [Validators.required, ValidationService.timeValidator]],
            'needPay': [this.product.needPay],
            'openRange': [this.product.openRange],
            'infinite': [this.product.infinite],
            'status': ['销售', [Validators.required]],
            'category': [{}]
        });
        this.uploader.onBuildItemForm = (item, form) => {
            form.append("loginName", "xiaomian");
            form.append("productId", this.product.id);
        };
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            this.product.imageSource = response;
            this.imageUrl = URL + '/' + this.product.imageSource + '-md';
        };
    }

    ngOnInit() {

        this.product = new Product();

        this.sub = this.route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            this.storeService.findCategoryByMerchant().then(value => {
                this.categorys = value;
                if (id === -1) {
                    let product: Product = new Product();

                    product.infinite = true;
                    product.needPay = true;
                    product.openRange = false;
                    product.unitsInOrder = 0;

                    this.isCreated = false;                    

                    return new Promise<Product>(resolve => {
                        resolve(product);
                    });
                } else {
                    this.isCreated = true;
                    return this.storeService.findProduct(id);
                }
            }).then(value => {
                this.product = value;
                if (this.product.id) {
                    (<FormControl>this.form.controls['name']).setValue(this.product.name);
                    (<FormControl>this.form.controls['unitPrice']).setValue(this.product.unitPrice);
                    this.form.controls['unitPrice'].markAsDirty();
                    (<FormControl>this.form.controls['description']).setValue(this.product.description ? this.product.description : '');
                    (<FormControl>this.form.controls['unitsInStock']).setValue(this.product.unitsInStock);
                    (<FormControl>this.form.controls['payTimeLimit']).setValue(this.product.payTimeLimit);
                    (<FormControl>this.form.controls['takeTimeLimit']).setValue(this.product.takeTimeLimit);
                    (<FormControl>this.form.controls['needPay']).setValue(this.product.needPay);
                    (<FormControl>this.form.controls['infinite']).setValue(this.product.infinite);
                    (<FormControl>this.form.controls['openRange']).setValue(this.product.openRange);
                    if (this.product.status === ProductStatus.ONLINE) {
                        (<FormControl>this.form.controls['status']).setValue('销售');
                    } else {
                        (<FormControl>this.form.controls['status']).setValue('下架');
                    }
                    if (this.product.category) {
                        for (let category of this.categorys) {
                            if (category.id === this.product.category.id) {
                                (<FormControl>this.form.controls['category']).setValue(category);
                                break;
                            }
                        }
                    }
                    if (this.product.imageSource) {
                        this.imageUrl = URL + '/' + this.product.imageSource + '-md';
                    }
                }
                console.log(value);
            }).catch(error => {
                console.log(error);
            });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onSubmit(event) {
        this.slimLoader.color = 'red';
        this.slimLoader.start();

        this.product.name = this.form.value.name;
        this.product.unitPrice = +this.form.value.unitPrice;
        this.product.description = this.form.value.description;
        this.product.unitsInStock = +this.form.value.unitsInStock;
        this.product.payTimeLimit = +this.form.value.payTimeLimit;
        this.product.takeTimeLimit = +this.form.value.takeTimeLimit;
        this.product.needPay = this.form.value.needPay;
        this.product.infinite = this.form.value.infinite;
        this.product.openRange = this.form.value.openRange;

        if (this.form.value.status === '销售') {
            this.product.status = ProductStatus.ONLINE;
        } else if (this.form.value.status === '下架') {
            this.product.status = ProductStatus.OFFLINE;
        }
        if (!this.form.value.category.id) {
            this.product.category = null;
        } else {
            this.product.category = this.form.value.category;
        }

        if (!this.product.id) {
            this.storeService.createProduct(this.product).then(value => {
                this.product = value;
                this.getStockDescription();
                this.isCreated = true;
                this.addToast("创建成功", this.product.name + " 创建成功");
                this.slimLoader.complete();
            }).catch(error => {
                console.log(error);
            });
        } else {
            this.storeService.modifyProduct(this.product).then(value => {
                console.log(value);
                this.product = value;
                this.getStockDescription();
                this.addToast("更新成功", this.product.name + " 更新成功");
                this.slimLoader.complete();
            }).catch(error => {
                console.log(error);
            });
        }
        event.stopPropagation();
        event.preventDefault();
    }

    getStockDescription() {
        this.stockDescription = '';
        if (this.product.infinite) {
            this.stockDescription = '无限库存';
        } else {
            if (this.product.unitsInStock === 0) {
                this.stockDescription = '商品库存为0';
            } else if (this.product.unitsInStock > 50) {
                this.stockDescription = '商品库存' + this.product.unitsInStock;
            } else {
                this.stockDescription = '商品库存有限，请尽快下单';
            }
        }
    }

    addToast(title: string, msg: string) {
        var toastOptions: ToastOptions = {
            title: title,
            msg: msg,
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
}