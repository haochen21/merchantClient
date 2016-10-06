import { NgModule } from '@angular/core';

import { MaterialModule } from '@angular/material';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';

import { SharedModule } from '../shared/shared.module';


import { NavbarModule } from '../navbar/navbar.module';

import { CartComponent } from './cart.component';
import { routing } from './cart.routing';


@NgModule({
    imports: [
        SharedModule,
        TabsModule,
        SlimLoadingBarModule.forRoot(),
        MaterialModule.forRoot(),
        NavbarModule,
        routing
    ],
    declarations: [CartComponent]
})
export class CartModule { }