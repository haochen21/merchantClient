import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { MaterialModule } from '@angular/material';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { TabsModule, ProgressbarModule } from 'ng2-bootstrap';
import { ToastyModule } from 'ng2-toasty';
import { FileUploadModule } from 'ng2-file-upload';

import { SharedModule } from '../shared/shared.module';
import { NavbarModule } from '../navbar/navbar.module';

import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list.component';
import { ProductCreateComponent } from './product-create.component';

import { ProductRoutingModule } from './product.routing';


@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule,
        SlimLoadingBarModule.forRoot(),
        MaterialModule,
        ToastyModule.forRoot(),
        TabsModule.forRoot(),
        ProgressbarModule.forRoot(),
        FileUploadModule,
        NavbarModule,
        ProductRoutingModule
    ],
    declarations: [ProductComponent, ProductListComponent, ProductCreateComponent]
})
export class ProductModule { }