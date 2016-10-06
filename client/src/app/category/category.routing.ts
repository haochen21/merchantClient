import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryComponent } from './category.component';
import { CategoryListComponent } from './category-list.component';
import { CategoryCreateComponent } from './category-create.component';
import { CategoryModifyComponent } from './category-modify.component';

const routes: Routes = [
    {
        path: '', component: CategoryComponent,
        children: [
            { path: '', component: CategoryListComponent },
            { path: 'modify/:id', component: CategoryModifyComponent },
            { path: 'create', component: CategoryCreateComponent }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
