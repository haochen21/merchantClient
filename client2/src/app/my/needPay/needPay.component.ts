import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { ProductService } from '../../services/product.service';

@Component({
  selector: 'product-needPay',
  templateUrl: './needPay.component.html',
  styleUrls: ['./needPay.component.css']
})
export class NeedPayComponent implements OnInit {

  needPay: boolean = true;    

  constructor(
    private productService: ProductService,
    private toastr: ToastrService) { }

  ngOnInit() {
   
  }

  ngOnDestroy() {
  }

  modifyValue(event) {
    this.needPay = event;
    console.log(this.needPay);
  }

  modifyNeedPay() {
    this.productService.modifyNeedPay(this.needPay)
      .subscribe(value => {
        this.toastr.success("修改完成", "修改完成");
      });
  }

}