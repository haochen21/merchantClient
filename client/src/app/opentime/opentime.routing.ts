import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenTimeComponent } from './opentime.component';

const routes: Routes = [
    { path: '', redirectTo: 'opentime', pathMatch: 'full' },
    { path: 'opentime', component: OpenTimeComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

