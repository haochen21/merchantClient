import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class CategoryRoutingModule { }