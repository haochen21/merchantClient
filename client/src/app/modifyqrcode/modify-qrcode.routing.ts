import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifyQrCodeComponent } from './modify-qrcode.component';

const routes: Routes = [
    { path: '', redirectTo: 'modifyqrcode', pathMatch: 'full' },
    { path: 'modifyqrcode', component: ModifyQrCodeComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
