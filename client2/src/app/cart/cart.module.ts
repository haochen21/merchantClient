import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { MomentModule } from 'ngx-moment';

import { CartStatusFormatPipe } from './CartStatus.pipe';
import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart.routing';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgZorroAntdMobileModule,
        MomentModule,
        CartRoutingModule
    ],
    declarations: [
        CartStatusFormatPipe,
        CartComponent
    ]
})
export class CartModule { }