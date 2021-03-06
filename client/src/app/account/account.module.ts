import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { MaterialModule } from '@angular/material';

import { NavbarModule } from '../navbar/navbar.module';

import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account.routing';

@NgModule({
    imports: [
        ReactiveFormsModule,
        SharedModule,
        SlimLoadingBarModule.forRoot(),
        MaterialModule,
        NavbarModule,
        AccountRoutingModule
    ],
    declarations: [AccountComponent]
})
export class AccountModule { }