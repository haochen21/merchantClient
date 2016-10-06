import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifyImageComponent } from './modify-image.component';

const routes: Routes = [
    { path: '', redirectTo: 'modifyimage', pathMatch: 'full' },
    { path: 'modifyimage', component: ModifyImageComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

