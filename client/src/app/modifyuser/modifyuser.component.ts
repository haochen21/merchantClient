import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Merchant } from '../model/Merchant';
import { ValidationService } from '../core/validation.service';
import { SecurityService } from '../core/security.service';


@Component({
  selector: 'merchant-modify',
  templateUrl: './modifyuser.component.html',
  styleUrls: ['./modifyuser.component.css']
})
export class ModifyUserComponent implements OnInit {

  merchant: Merchant = new Merchant();

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private securityService: SecurityService,
    private router: Router) {

    this.form = formBuilder.group({
      'loginName': ['', ,],
      'name': ['', Validators.required],
      'deviceNo': ['', [], ValidationService.deviceExists],
      'phone': ['', [Validators.required, ValidationService.phoneValidator]],
      'email': ['', [Validators.required, ValidationService.emailValidator]],
      'shortName': ['', ,],
      'address': ['', ,],
      'description': ['', [Validators.minLength(4), Validators.maxLength(255)],],
      'takeByPhone': ['', ,],
      'takeByPhoneSuffix': ['', ,]
    });
  }

  ngOnInit() {
    this.securityService.findMerchant().then(user => {
      this.merchant = <Merchant>user;
      console.log(user);
      (<FormControl>this.form.controls['loginName']).setValue(this.merchant.loginName);
      (<FormControl>this.form.controls['name']).setValue(this.merchant.name);
      (<FormControl>this.form.controls['deviceNo']).setValue(this.merchant.deviceNo);
      (<FormControl>this.form.controls['phone']).setValue(this.merchant.phone);
      (<FormControl>this.form.controls['shortName']).setValue(this.merchant.shortName);
      (<FormControl>this.form.controls['email']).setValue(this.merchant.mail);
      (<FormControl>this.form.controls['address']).setValue(this.merchant.address);
      (<FormControl>this.form.controls['description']).setValue(this.merchant.description);
    }).catch(error => {
      console.log(error)
    });
  }

  onSubmit() {
    let merchant: Merchant = new Merchant();
    merchant.id = this.merchant.id;
    merchant.version = this.merchant.version;

    merchant.loginName = this.form.value.loginName;
    merchant.password = this.form.value.password;
    merchant.name = this.form.value.name;
    merchant.phone = this.form.value.phone;
    merchant.mail = this.form.value.email;
    merchant.deviceNo = this.form.value.deviceNo;
    merchant.shortName = this.form.value.shortName;
    merchant.address = this.form.value.address;
    merchant.takeByPhone = this.merchant.takeByPhone;
    merchant.takeByPhoneSuffix = this.merchant.takeByPhoneSuffix;
    merchant.description = this.form.value.description;

    this.securityService.modifyMerchant(merchant).then(value => {
      localStorage.setItem('merchant', JSON.stringify(value));
      this.router.navigate(['/my']);
    }).catch(error => {
      console.log(error)
    });
  }
}

