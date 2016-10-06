import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { MaterialModule } from '@angular/material';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { TimepickerModule } from 'ng2-bootstrap/ng2-bootstrap';

import { OpenTimeComponent } from './opentime.component';
import { routing } from './opentime.routing';

@NgModule({
    imports: [
        SharedModule,
        MaterialModule.forRoot(),
        SlimLoadingBarModule.forRoot(),
        TimepickerModule,
        routing
    ],
    declarations: [OpenTimeComponent]
})
export class OpentimeModule { }