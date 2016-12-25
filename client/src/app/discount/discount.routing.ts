import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiscountComponent } from './discount.component';

const routes: Routes = [
    { path: '', redirectTo: 'discount', pathMatch: 'full' },
    { path: 'discount', component: DiscountComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
