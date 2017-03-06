import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { MaterialModule } from '@angular/material';

import { LockComponent } from './lock.component';
import { LockRoutingModule } from './lock.routing';

@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule,
        LockRoutingModule
    ],
    declarations: [LockComponent]
})
export class LockModule { }