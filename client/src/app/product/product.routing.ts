import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProductRoutingModule { }