import { Component, OnInit, OnDestroy } from '@angular/core';

import { SecurityService } from '../../services/security.service';

import { Merchant } from '../../model/Merchant';

const URL = 'http://shop.km086.com:8080/ticketServer/security/merchant/image';
declare var $: any;

@Component({
  selector: 'merchant-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.css']
})
export class IntroduceComponent implements OnInit, OnDestroy {

  merchant: Merchant = new Merchant();

  imgObj: any = {
    src: ''
  };

  editorContent: string = '';

  constructor(
    private securityService: SecurityService) {
  }

  ngOnInit() {
    this.securityService
      .findMerchantWithIntroduce()
      .subscribe(user => {
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
      });
  }

  ngOnDestroy() {
  }

  public imgModel: Object = {
    src: '../image.jpg'
  };

  save(event) {
    this.securityService
      .modifyIntroduce(this.editorContent)
      .subscribe(value => {
      });
    event.stopPropagation();
    event.preventDefault();
  }

  modifyShowIntroduce(event) {
    let checkValue = event.checked;
    this.merchant.showIntroduce = checkValue;
    this.securityService.modifyMerchant(this.merchant)
      .subscribe(value => {
        localStorage.setItem('merchant', JSON.stringify(value));
      });
  }

}