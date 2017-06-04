import { Component, OnInit, OnDestroy } from '@angular/core';

import * as moment from 'moment';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { SecurityService } from '../core/security.service';

import { Merchant } from '../model/Merchant';
import { MerchantIntro } from '../model/MerchantIntro';

const URL = 'http://shop.km086.com:8080/ticketServer/security/merchant/image';
declare var $: any;

@Component({
  selector: 'merchant-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.css']
})
export class IntroduceComponent implements OnInit, OnDestroy {

  merchant: Merchant;

  imgObj: Object = {
    src: ''
  };

  editorContent: string = '';

  constructor(
    private securityService: SecurityService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private slimLoader: SlimLoadingBarService) {

    this.toastyConfig.theme = 'material';
    this.toastyConfig.position = 'top-center';
    
  }

  ngOnInit() {
    this.securityService
      .findMerchantWithIntroduce()
      .then(user => {
        console.log(user);
        this.merchant = <Merchant>user;
        if (this.merchant.introduce) {
          this.editorContent = this.merchant.introduce.introduce;
        }
        if (this.merchant.imageSource) {
          if (this.editorContent.indexOf('<img') === -1) {
            let imageUrl: string = '<img src="' + URL + '/' + this.merchant.imageSource + '-md/?' + new Date().getTime() + '" style="width: 100%;" class="img-fluid fr-fic fr-dib fr-draggable fr-fir">';
            this.editorContent = imageUrl + this.editorContent;
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  ngOnDestroy() {
  }

  public imgModel: Object = {
    src: '../image.jpg'
  };

  save(event) {
    this.slimLoader.start();
    this.securityService
      .modifyIntroduce(this.editorContent)
      .then(value => {
        this.addToast("更新成功", "商家简介更新成功");
        this.slimLoader.complete();
      })
      .catch(error => {
        console.log(error);
        this.slimLoader.complete();
      });
    event.stopPropagation();
    event.preventDefault();
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