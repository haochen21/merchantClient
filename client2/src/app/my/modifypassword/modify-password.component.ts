import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SecurityService } from '../../services/security.service';

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

        this.form = this.formBuilder.group({
            'password': ['', [Validators.required, this.passwordValidator.bind(this)]],
            'passwordConfirm': ['', Validators.required]
        }, { validator: this.matchingPasswords('password', 'passwordConfirm') });
    }

    onSubmit() {
        this.securityService.modifyPassword(this.form.value.password)
            .subscribe(result => {
                this.router.navigate(['/my']);
            });
    }

    getFormControl(name) {
        return this.form.get(name);
    }

    passwordValidator(control: FormControl) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }

    matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
            let passwordInput = group.controls[passwordKey];
            let passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({ 'invalidPasswordConfirm': true });
            } else {
                return null;
            }
        }
    }
}