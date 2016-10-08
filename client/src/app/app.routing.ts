import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoContent } from './core/no-content';

export const routes: Routes = [
  { path: '', redirectTo: 'order', pathMatch: 'full' },
  { path: 'login', loadChildren: 'app/login/login.module#LoginModule' },
  { path: 'order', loadChildren: 'app/order/order.module#OrderModule' },
  { path: 'product', loadChildren: 'app/product/product.module#ProductModule' },
  { path: 'cart', loadChildren: 'app/cart/cart.module#CartModule' },
  { path: 'hiscart', loadChildren: 'app/hiscart/hiscart.module#HisCartModule' },
  { path: 'category', loadChildren: 'app/category/category.module#CategoryModule' },
  { path: 'merchant', loadChildren: 'app/merchant/merchant.module#MerchantModule' },
  { path: 'my', loadChildren: 'app/my/my.module#MyModule' },
  { path: 'modifyuser', loadChildren: 'app/modifyuser/modifyuser.module#ModifyUserModule' },
  { path: 'modifypassword', loadChildren: 'app/modifypassword/modify-password.module#ModifyPasswordModule' },
  { path: 'modifyimage', loadChildren: 'app/modifyimage/modify-image.module#ModifyImageModule' },
  { path: 'modifyQrCode', loadChildren: 'app/modifyqrcode/modify-qrcode.module#ModifyQrcodeModule'},
  { path: 'lock', loadChildren: 'app/lock/lock.module#LockModule' },
  { path: 'openRange', loadChildren: 'app/opentime/opentime.module#OpentimeModule' },
  { path: 'account', loadChildren: 'app/account/account.module#AccountModule' },
  { path: '**', component: NoContent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });

