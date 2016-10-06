import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LockComponent } from './lock.component';

const routes: Routes = [
    { path: '', redirectTo: 'lock', pathMatch: 'full' },
    { path: 'lock', component: LockComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

