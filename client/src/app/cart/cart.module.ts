import { NgModule } from '@angular/core';

import { MaterialModule } from '@angular/material';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { TabsModule } from 'ng2-bootstrap';

import { SharedModule } from '../shared/shared.module';


import { NavbarModule } from '../navbar/navbar.module';

import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart.routing';


@NgModule({
    imports: [
        SharedModule,
        TabsModule.forRoot(),
        SlimLoadingBarModule.forRoot(),
        MaterialModule,
        NavbarModule,
        CartRoutingModule
    ],
    declarations: [CartComponent]
})
export class CartModule { }