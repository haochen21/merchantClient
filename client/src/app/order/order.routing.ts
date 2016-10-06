import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderComponent } from './order.component';

const routes: Routes = [
    { path: '', redirectTo: 'order', pathMatch: 'full' },
    { path: 'order', component: OrderComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

