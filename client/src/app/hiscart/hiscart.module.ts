import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@angular/material';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { TabsModule } from 'ng2-bootstrap';

import { SharedModule } from '../shared/shared.module';


import { NavbarModule } from '../navbar/navbar.module';

import { HisCartComponent } from './hiscart.component';
import { HisCartRoutingModule } from './hiscart.routing';


@NgModule({
    imports: [
        ReactiveFormsModule,
        SharedModule,
        TabsModule,
        MaterialModule.forRoot(),
        SlimLoadingBarModule.forRoot(),
        NavbarModule,
        HisCartRoutingModule
    ],
    declarations: [HisCartComponent]
})
export class HisCartModule { }