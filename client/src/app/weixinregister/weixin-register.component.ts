import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ValidationService } from '../core/validation.service';
import { SecurityService } from '../core/security.service';

import { Customer } from '../model/Customer';


@Component({
  selector: 'ticket-weixin',
  templateUrl: './weixin-register.component.html',
  styleUrls: ['./weixin-register.component.css']
})
export class WeixinRegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private securityService: SecurityService,
    private router: Router) {

    this.form = formBuilder.group({
      'phone': ['', [Validators.required, ValidationService.phoneValidator, Validators.minLength(11), Validators.maxLength(11)], [ValidationService.devicePhoneExists, ValidationService.phoneExists]]
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    this.securityService.registerMerchantInWeixin(this.form.value.phone).then(result => {
      this.router.navigate(['/my']);
    }).catch(error => {
      console.log(error);
    });
  }
}

