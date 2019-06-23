import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';

import { from } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import * as moment from 'moment';

import { ProductService } from '../services/product.service';
import { SecurityService } from '../services/security.service';

import { Category } from '../model/Category';
import { Product } from '../model/Product';
import { ProductStatus } from '../model/ProductStatus';
import { OpenRange } from '../model/OpenRange';
import { OpenRangeType } from '../model/OpenRangeType';

const URL = 'http://shop.km086.com:8080/ticketServer/store/product/image';

@Component({
    selector: 'product-create',
    templateUrl: './product-create.component.html',
    styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

    form: FormGroup;

    status = ['销售', '下架'];

    categorys: Array<Category>;

    product: Product = new Product();    

    isCreated: boolean = false;

    merchantOpenTimes: Array<OpenRange> = new Array();

    uploader: FileUploader = new FileUploader({ url: URL });

    fileSize: number = 5;

    URL: string = this.productService.imagePreUrl;

    imageUrl: string;

    stockDescription: string;

    private sub: any;

    constructor(
        private formBuilder: FormBuilder,
        private productService: ProductService,
        private securityService: SecurityService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService) {

        this.form = this.formBuilder.group({
            'name': ['', [Validators.minLength(2), Validators.maxLength(20)]],
            'unitPrice': ['', [Validators.required, this.currencyValidator.bind(this)]],
            'description': ['', [Validators.minLength(4), Validators.maxLength(255)]],
            'unitsInStock': ['0', [Validators.required, this.numberValidator.bind(this)]],
            'payTimeLimit': ['10', [Validators.required, this.timeValidator.bind(this)]],
            'takeTimeLimit': ['0', [Validators.required, this.timeValidator.bind(this)]],
            'needPay': [this.product.needPay],
            'openRange': [this.product.openRange],
            'infinite': [this.product.infinite],
            'status': ['销售', [Validators.required]],
            'sequence': ['1', ,],
            'code': ['', [Validators.maxLength(10)]],
            'productProperties': [''],
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
        this.product.openRange = true;
    }

    ngOnInit() {

        this.product = new Product();
        let id = +this.route.snapshot.params.id;

        this.securityService.findOpenRanges()
            .pipe(flatMap(value => {
                this.covertOpenRangeToDate(value.openRanges);
                return this.productService.findCategoryByMerchant();
            }))
            .pipe(flatMap(value => {
                this.categorys = value;
                if (id === -1) {
                    let product: Product = new Product();

                    product.infinite = true;
                    product.needPay = true;
                    product.openRange = true;
                    product.unitsInOrder = 0;
                    product.openRanges = [];                    
                    this.isCreated = false;

                    from([product])
                    return new Promise<Product>(resolve => {
                        resolve(product);
                    });
                } else {
                    this.isCreated = true;
                    return this.productService.findProduct(id);
                }
            }))
            .subscribe(value => {
                this.product = value;
                this.setMerchantOpenTimeChecked(this.product.openRanges);
                if (this.product.id) {
                    (<FormControl>this.form.controls['name']).setValue(this.product.name);
                    (<FormControl>this.form.controls['code']).setValue(this.product.code);
                    (<FormControl>this.form.controls['unitPrice']).setValue(this.product.unitPrice);
                    this.form.controls['unitPrice'].markAsDirty();
                    (<FormControl>this.form.controls['description']).setValue(this.product.description ? this.product.description : '');
                    (<FormControl>this.form.controls['unitsInStock']).setValue(this.product.unitsInStock);
                    (<FormControl>this.form.controls['payTimeLimit']).setValue(this.product.payTimeLimit);
                    (<FormControl>this.form.controls['takeTimeLimit']).setValue(this.product.takeTimeLimit);
                    (<FormControl>this.form.controls['needPay']).setValue(this.product.needPay);
                    (<FormControl>this.form.controls['infinite']).setValue(this.product.infinite);
                    (<FormControl>this.form.controls['openRange']).setValue(this.product.openRange);
                    (<FormControl>this.form.controls['sequence']).setValue(this.product.sequence);
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
                    (<FormControl>this.form.controls['productProperties']).setValue(JSON.stringify(this.product.productProperties));
                    if (this.product.imageSource) {
                        this.imageUrl = URL + '/' + this.product.imageSource + '-md';
                    }
                }
                console.log(value);
            });
    }

    onSubmit(event) {
        if (!this.product['id']) {
            this.productService.productExist(this.form.value.name)
                .subscribe(value => {
                    if (value.exist) {
                        this.toastr.error("创建失败", this.form.value.name + " 商品名称已存在！");
                    } else {
                        this.product.name = this.form.value.name;
                        this.product.code = this.form.value.code;
                        this.product.unitPrice = +this.form.value.unitPrice;
                        this.product.description = this.form.value.description;
                        this.product.unitsInStock = +this.form.value.unitsInStock;
                        this.product.payTimeLimit = +this.form.value.payTimeLimit;
                        this.product.takeTimeLimit = +this.form.value.takeTimeLimit;
                        this.product.sequence = this.form.value.sequence;

                        if (this.form.value.status === '销售') {
                            this.product.status = ProductStatus.ONLINE;
                        } else if (this.form.value.status === '下架') {
                            this.product.status = ProductStatus.OFFLINE;
                        }
                        let categoryId: number = -1;
                        if (!this.form.value.category.id) {
                            this.product.category = null;
                        } else {
                            this.product.category = this.form.value.category;
                            categoryId = this.form.value.category.id;
                        }

                        this.product.openRanges = [];
                        for (let merchantOpenTime of this.merchantOpenTimes) {
                            if (merchantOpenTime.checked) {
                                this.product.openRanges.push(merchantOpenTime);
                            }
                        }

                        this.product.productProperties = JSON.parse(this.form.value.productProperties);

                        this.productService.createProduct(this.product)
                            .subscribe(value => {
                                this.product = value;
                                this.getStockDescription();
                                this.isCreated = true;
                                this.toastr.success("创建成功", this.product.name + " 创建成功");
                                this.router.navigate(['/product', categoryId]);
                            });
                    }
                });
        } else {

            this.product.name = this.form.value.name;
            this.product.code = this.form.value.code;
            this.product.unitPrice = +this.form.value.unitPrice;
            this.product.description = this.form.value.description;
            this.product.unitsInStock = +this.form.value.unitsInStock;
            this.product.payTimeLimit = +this.form.value.payTimeLimit;
            this.product.takeTimeLimit = +this.form.value.takeTimeLimit;
            this.product.sequence = this.form.value.sequence;

            if (this.form.value.status === '销售') {
                this.product.status = ProductStatus.ONLINE;
            } else if (this.form.value.status === '下架') {
                this.product.status = ProductStatus.OFFLINE;
            }
            let categoryId: number = -1;
            if (!this.form.value.category.id) {
                this.product.category = null;
            } else {
                this.product.category = this.form.value.category;
                categoryId = this.form.value.category.id;
            }

            this.product.openRanges = [];
            for (let merchantOpenTime of this.merchantOpenTimes) {
                if (merchantOpenTime.checked) {
                    this.product.openRanges.push(merchantOpenTime);
                }
            }
            this.product.productProperties = JSON.parse(this.form.value.productProperties);
            
            this.productService.modifyProduct(this.product)
                .subscribe(value => {
                    console.log(value);
                    this.product = value;
                    this.getStockDescription();
                    this.toastr.success("更新成功", this.product.name + " 更新成功");
                    this.router.navigate(['/product', categoryId]);
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

    covertOpenRangeToDate(openRanges: Array<OpenRange>) {
        for (let openRange of openRanges) {
            if (openRange.type == OpenRangeType.OFF) {
                continue;
            }
            let beginDateTime: moment.Moment = moment(new Date()).add(1, 'd');
            let beginTimes: any = openRange.beginTime.toString().split(':');
            beginDateTime = beginDateTime.hours(beginTimes[0]).minutes(beginTimes[1]).seconds(beginTimes[2]).milliseconds(0);

            let endDateTime: moment.Moment = moment(new Date()).add(1, 'd');
            let endTimes: any = openRange.endTime.toString().split(':');
            endDateTime = endDateTime.hours(endTimes[0]).minutes(endTimes[1]).seconds(endTimes[2]).milliseconds(0);

            let beginDate: moment.Moment = moment(openRange.beginTime.toString(), "HH:mm:ss");
            let endDate: moment.Moment = moment(openRange.endTime.toString(), "HH:mm:ss");
            openRange.beginTime = beginDate.toDate();
            openRange.endTime = endDate.toDate();
            openRange.takeBeginTime = beginDateTime.toDate();
            openRange.takeEndTime = endDateTime.toDate();
            openRange.desc = beginTimes[0] + ':' + beginTimes[1] + ' - ' + endTimes[0] + ':' + endTimes[1];
            openRange.checked = false;

            this.merchantOpenTimes.push(openRange);
        }
        this.merchantOpenTimes.sort(function (a, b) {
            if (a.takeBeginTime > b.takeBeginTime) {
                return 1;
            }
            if (a.takeBeginTime < b.takeBeginTime) {
                return -1;
            }
            return 0;
        });
    }

    getFormControl(name) {
        return this.form.get(name);
    }

    setMerchantOpenTimeChecked(openRanges: Array<OpenRange>) {
        for (let merchantOpenTime of this.merchantOpenTimes) {
            for (let openRange of openRanges) {
                if (openRange.id === merchantOpenTime.id) {
                    merchantOpenTime.checked = true;
                    break;
                }
            }
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

    numberValidator(control: FormControl) {
        if (typeof control.value !== "function") {
            return null;
        } else if (control.value.match(/^([1-9]\d*|[0]{1,1})$/)) {
            return null;
        } else {
            return { 'invalidNumber': true };
        }
    }

    timeValidator(control: FormControl) {
        if (typeof control.value !== "function") {
            return null;
        } else if (control.value.match(/^([1-9]\d*)$/)) {
            return null;
        } else {
            return { 'invalidTime': true };
        }
    }
}