import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProgressbarModule } from 'ng2-bootstrap/ng2-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';

import { SharedModule } from '../shared/shared.module';

import { NavbarModule } from '../navbar/navbar.module';

import { ModifyImageComponent } from './modify-image.component';
import { routing } from './modify-image.routing';


@NgModule({
    imports: [
        SharedModule,
        RouterModule,
        ProgressbarModule,
        FileUploadModule,
        NavbarModule,
        routing
    ],
    declarations: [ModifyImageComponent]
})
export class ModifyImageModule { }