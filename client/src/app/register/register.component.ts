import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ValidationService } from '../core/validation.service';
import { SecurityService } from '../core/security.service';

import {Merchant} from '../model/Merchant';

@Component({
  selector: 'merchant-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private securityService: SecurityService,
    private router: Router) {

    this.form = formBuilder.group({
      'loginName': ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)], ValidationService.loginNameExists],
      'password': ['', [Validators.required, ValidationService.passwordValidator]],
      'passwordConfirm': ['', Validators.required],
      'name': ['', Validators.required],
      'phone': ['', [Validators.required]],
      'email': ['', [Validators.required, ValidationService.emailValidator]],
      'shortName': ['', ,],
      'address': ['', ,]
    }, { validator: ValidationService.matchingPasswords('password', 'passwordConfirm') });
  }

  onSubmit() {
    let merchant: Merchant = new Merchant();
    merchant.loginName = this.form.value.loginName;
    merchant.password = this.form.value.password;
    merchant.name = this.form.value.name;
    merchant.phone = this.form.value.phone;
    merchant.mail = this.form.value.email;
    merchant.shortName = this.form.value.shortName;
    merchant.address = this.form.value.address;
    merchant.discount = 1.0;
    
    this.securityService.registerMerchant(merchant).then(value => {
      localStorage.setItem('merchant', JSON.stringify(value));
      this.router.navigate(['/login']);
    }).catch(error => {
      console.log(error)
    });
  }
}

