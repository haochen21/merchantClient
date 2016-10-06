import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {SecurityService} from '../core/security.service';

@Component({
  selector: 'merchant-lock',
  templateUrl: './lock.component.html',
  styleUrls: ['./lock.component.css']
})
export class LockComponent implements OnInit {

  form: FormGroup;

  unLock: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private securityService: SecurityService,
    private router: Router) {

    this.form = formBuilder.group({
      'password': ['', [Validators.required]]
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    this.securityService.merchantLock(this.form.value.password).then(result => {
      this.unLock = result.unLock;
      if (this.unLock) {
        this.router.navigate(['/merchant']);
      }
    }).catch(error => {
      console.log(error);
    });
  }
}

