import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { MomentModule } from 'ngx-moment';
import { FileUploadModule } from 'ng2-file-upload';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { OpenRangeTypePipe } from './OpenRangeType.pipe';
import { MapToIterable } from './MapToIterable.pipe';
import { CartStatusFormatPipe } from './CartStatus.pipe';

import { MyRoutingModule } from './my.routing';
import { MyHomeComponent } from './my-home/my-home.component';
import { ModifyUserComponent } from './modifyuser/modifyuser.component';
import { MyCenterComponent } from './my-center/my-center.component';
import { OpenTimeComponent } from './opentime/opentime.component';
import { OffTimeComponent } from './offtime/offtime.component';
import { ModifyPasswordComponent } from './modifypassword/modify-password.component';
import { ModifyImageComponent } from './modifyimage/modify-image.component';
import { IntroduceComponent } from './introduce/introduce.component';
import { CategoryListComponent } from './category/category-list.component';
import { CategoryCreateComponent } from './category/category-create.component';
import { CategoryModifyComponent } from './category/category-modify.component';
import { AccountComponent } from './account/account.component';
import { ModifyQrCodeComponent } from './modifyqrcode/modify-qrcode.component';
import { HisCartComponent } from './hiscart/hiscart.component';
import { DiscountComponent } from './discount/discount.component';
import { UploadProductComponent } from './uploadProduct/upload-product.component';
import { NeedPayComponent } from './needPay/needPay.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdMobileModule,
    FileUploadModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    MomentModule,
    MyRoutingModule
  ],
  declarations: [
    OpenRangeTypePipe,
    MapToIterable,
    CartStatusFormatPipe,
    MyHomeComponent,
    ModifyUserComponent,
    MyCenterComponent,
    OpenTimeComponent,
    OffTimeComponent,
    ModifyPasswordComponent,
    ModifyImageComponent,
    IntroduceComponent,
    CategoryListComponent,
    CategoryCreateComponent,
    CategoryModifyComponent,
    AccountComponent,
    ModifyQrCodeComponent,
    HisCartComponent,
    DiscountComponent,
    UploadProductComponent,
    NeedPayComponent
  ]
})
export class MyModule { }