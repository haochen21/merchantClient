import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


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

const routes: Routes = [
    {
        path: '',
        component: MyCenterComponent,
        children: [
            {
                path: '',
                component: MyHomeComponent
            },
            {
                path: 'modifyuser',
                component: ModifyUserComponent
            },
            {
                path: 'openRange',
                component: OpenTimeComponent
            },
            {
                path: 'offTime',
                component: OffTimeComponent
            },
            {
                path: 'modifypassword',
                component: ModifyPasswordComponent
            },
            {
                path: 'modifyimage',
                component: ModifyImageComponent
            },
            {
                path: 'introduce',
                component: IntroduceComponent
            },            
            {
                path: 'category',
                component: CategoryListComponent
            },            
            {
                path: 'createCategory',
                component: CategoryCreateComponent
            },
            {
                path: 'modifyCategory/:id',
                component: CategoryModifyComponent
            },
            {
                path: 'account',
                component: AccountComponent
            },
            {
                path: 'modifyQrCode',
                component: ModifyQrCodeComponent
            },
            {
                path: 'hiscart',
                component: HisCartComponent
            },
            {
                path: 'discount',
                component: DiscountComponent
            },
            {
                path: 'uploadProduct',
                component: UploadProductComponent
            },
            {
                path: 'needPay',
                component: NeedPayComponent
            }             
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class MyRoutingModule { }