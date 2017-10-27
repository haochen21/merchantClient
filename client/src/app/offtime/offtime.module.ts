import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { NavbarModule } from '../navbar/navbar.module';
import { MaterialModule } from '@angular/material';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { TimepickerModule } from 'ng2-bootstrap';

import { OffTimeComponent } from './offtime.component';
import { OffTimeRoutingModule } from './offtime.routing';

@NgModule({
    imports: [
        SharedModule,
        MaterialModule.forRoot(),
        SlimLoadingBarModule.forRoot(),
        TimepickerModule.forRoot(),
        NavbarModule,
        OffTimeRoutingModule
    ],
    declarations: [OffTimeComponent]
})
export class OfftimeModule { }