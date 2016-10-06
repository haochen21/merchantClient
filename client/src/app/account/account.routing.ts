import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';

const routes: Routes = [
    { path: '', redirectTo: 'account', pathMatch: 'full' },
    { path: 'account', component: AccountComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

