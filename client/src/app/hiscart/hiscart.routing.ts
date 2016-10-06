import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HisCartComponent } from './hiscart.component';

const routes: Routes = [
    { path: '', redirectTo: 'hiscart', pathMatch: 'full' },
    { path: 'hiscart', component: HisCartComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

