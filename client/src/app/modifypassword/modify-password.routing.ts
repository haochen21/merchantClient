import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifyPasswordComponent } from './modify-password.component';

const routes: Routes = [
    { path: '', redirectTo: 'modifypassword', pathMatch: 'full' },
    { path: 'modifypassword', component: ModifyPasswordComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
