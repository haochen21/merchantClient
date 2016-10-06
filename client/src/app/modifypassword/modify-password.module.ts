import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { ModifyPasswordComponent } from './modify-password.component';
import { routing } from './modify-password.routing';

@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule,
        routing
    ],
    declarations: [ModifyPasswordComponent]
})
export class ModifyPasswordModule { }