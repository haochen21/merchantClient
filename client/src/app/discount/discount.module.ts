import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NavbarModule } from '../navbar/navbar.module';

import { DiscountComponent } from './discount.component';
import { routing } from './discount.routing';

@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule,
        NavbarModule,
        routing
    ],
    declarations: [DiscountComponent]
})
export class DiscountModule { }