import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { NavbarModule } from '../navbar/navbar.module';
import { MaterialModule } from '@angular/material';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { TakeOutComponent } from './takeout.component';
import { TakeOutRoutingModule } from './takeout.routing';

@NgModule({
    imports: [
        SharedModule,
        MaterialModule,
        SlimLoadingBarModule.forRoot(),
        NavbarModule,
        TakeOutRoutingModule
    ],
    declarations: [TakeOutComponent]
})
export class TakeOutModule { }