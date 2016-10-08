import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeixinRegisterComponent } from './weixin-register.component';

const routes: Routes = [
    { path: '', redirectTo: 'weixinRegister', pathMatch: 'full' },
    { path: 'weixinRegister', component: WeixinRegisterComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

