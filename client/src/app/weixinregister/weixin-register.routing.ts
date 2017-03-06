import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeixinRegisterComponent } from './weixin-register.component';

const routes: Routes = [
    { path: '', redirectTo: 'weixinRegister', pathMatch: 'full' },
    { path: 'weixinRegister', component: WeixinRegisterComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class WeixinRegisterRoutingModule { }