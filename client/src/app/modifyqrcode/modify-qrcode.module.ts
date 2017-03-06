import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { NavbarModule } from '../navbar/navbar.module';

import { ModifyQrCodeComponent } from './modify-qrcode.component';
import { ModifyQrcodeRoutingModule } from './modify-qrcode.routing';


@NgModule({
    imports: [
        SharedModule,
        RouterModule,
        NavbarModule,
        ModifyQrcodeRoutingModule
    ],
    declarations: [ModifyQrCodeComponent]
})
export class ModifyQrcodeModule { }