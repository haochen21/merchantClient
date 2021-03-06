import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { MaterialModule } from '@angular/material';

import { WeixinRegisterComponent } from './weixin-register.component';
import { WeixinRegisterRoutingModule } from './weixin-register.routing';

@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule,
        MaterialModule,
        WeixinRegisterRoutingModule
    ],
    declarations: [WeixinRegisterComponent]
})
export class WeixinRegisterModule { }