import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NavbarModule } from '../navbar/navbar.module';

import { MaterialModule } from '@angular/material';

import { DiscountComponent } from './discount.component';
import { DiscountRoutingModule } from './discount.routing';

@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule,
        MaterialModule,
        NavbarModule,
        DiscountRoutingModule
    ],
    declarations: [
        DiscountComponent
    ]
})
export class DiscountModule { }