import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { NavbarModule } from '../navbar/navbar.module';
import { MaterialModule } from '@angular/material';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { TimepickerModule } from 'ng2-bootstrap';

import { OpenTimeComponent } from './opentime.component';
import { OpenTimeRoutingModule } from './opentime.routing';

@NgModule({
    imports: [
        SharedModule,
        MaterialModule.forRoot(),
        SlimLoadingBarModule.forRoot(),
        TimepickerModule.forRoot(),
        NavbarModule,
        OpenTimeRoutingModule
    ],
    declarations: [OpenTimeComponent]
})
export class OpentimeModule { }