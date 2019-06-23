import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { MomentModule } from 'ngx-moment';
import { FileUploadModule } from 'ng2-file-upload';

import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list.component';
import { ProductCreateComponent } from './product-create.component';

import { ProductRoutingModule } from './product.routing';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgZorroAntdMobileModule,
        MomentModule,
        FileUploadModule,
        ProductRoutingModule
    ],
    declarations: [
        ProductComponent,
        ProductListComponent,
        ProductCreateComponent
    ]
})
export class ProductModule { }