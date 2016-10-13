import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list.component';
import { ProductCreateComponent } from './product-create.component';

const routes: Routes = [
    {
        path: '', component: ProductComponent,
        children: [
            { path: ':categoryId', component: ProductListComponent },
            { path: 'create/:id', component: ProductCreateComponent }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
