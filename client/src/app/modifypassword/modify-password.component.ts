import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {User} from '../model/User';
import { ValidationService } from '../core/validation.service';
import {SecurityService} from '../core/security.service';

@Component({
    selector: 'password-modify',
    templateUrl: './modify-password.component.html',
    styleUrls: ['./modify-password.component.css']
})
export class ModifyPasswordComponent {

    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private securityService: SecurityService,
        private router: Router) {

        this.form = formBuilder.group({
            'password': ['', [Validators.required, ValidationService.passwordValidator]],
            'passwordConfirm': ['', Validators.required]
        }, { validator: ValidationService.matchingPasswords('password', 'passwordConfirm') });
    }

    onSubmit() {
        this.securityService.modifyPassword(this.form.value.password).then(result => {
            window.history.back();
        }).catch(error => {
            console.log(error);
        });
    }
}