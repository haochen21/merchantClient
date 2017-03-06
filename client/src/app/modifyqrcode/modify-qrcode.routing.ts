import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifyQrCodeComponent } from './modify-qrcode.component';

const routes: Routes = [
    { path: '', redirectTo: 'modifyqrcode', pathMatch: 'full' },
    { path: 'modifyqrcode', component: ModifyQrCodeComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ModifyQrcodeRoutingModule { }