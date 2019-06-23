import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'order', loadChildren: './order/order.module#OrderModule' },
  { path: 'product', loadChildren: './product/product.module#ProductModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartModule' },
  { path: 'my', loadChildren: './my/my.module#MyModule' },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: '', redirectTo: '/my', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
