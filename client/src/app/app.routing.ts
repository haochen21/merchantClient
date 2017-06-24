import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoContent } from './core/no-content';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'order', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterModule' },
  { path: 'order', loadChildren: './order/order.module#OrderModule' },
  { path: 'product', loadChildren: './product/product.module#ProductModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartModule' },
  { path: 'hiscart', loadChildren: './hiscart/hiscart.module#HisCartModule' },
  { path: 'category', loadChildren: './category/category.module#CategoryModule' },
  { path: 'my', loadChildren: './my/my.module#MyModule' },
  { path: 'modifyuser', loadChildren: './modifyuser/modifyuser.module#ModifyUserModule' },
  { path: 'modifypassword', loadChildren: './modifypassword/modify-password.module#ModifyPasswordModule' },
  { path: 'modifyimage', loadChildren: './modifyimage/modify-image.module#ModifyImageModule' },
  { path: 'modifyQrCode', loadChildren: './modifyqrcode/modify-qrcode.module#ModifyQrcodeModule'},
  { path: 'weixinRegister', loadChildren: './weixinregister/weixin-register.module#WeixinRegisterModule'},
  { path: 'lock', loadChildren: './lock/lock.module#LockModule' },
  { path: 'openRange', loadChildren: './opentime/opentime.module#OpentimeModule' },
  { path: 'account', loadChildren: './account/account.module#AccountModule' },
  { path: 'discount', loadChildren: './discount/discount.module#DiscountModule' },
  { path: 'takeout', loadChildren: './takeout/takeout.module#TakeOutModule' },
  { path: 'introduce', loadChildren: './introduce/introduce.module#IntroduceModule' },
  { path: 'approved', loadChildren: './approved/approved.module#ApprovedModule' },
  { path: '**', component: NoContent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes,{ useHash: true })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }