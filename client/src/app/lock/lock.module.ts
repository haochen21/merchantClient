import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { LockComponent } from './lock.component';
import { routing } from './lock.routing';

@NgModule({
    imports: [SharedModule, ReactiveFormsModule, RouterModule, routing],
    declarations: [LockComponent]
})
export class LockModule { }