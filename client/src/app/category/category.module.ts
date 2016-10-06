import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { MaterialModule } from '@angular/material';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { SharedModule } from '../shared/shared.module';
import { NavbarModule } from '../navbar/navbar.module';

import { CategoryComponent } from './category.component';
import { CategoryListComponent } from './category-list.component';
import { CategoryCreateComponent } from './category-create.component';
import { CategoryModifyComponent } from './category-modify.component';
import { routing } from './category.routing';


@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule,
        SlimLoadingBarModule.forRoot(),
        MaterialModule.forRoot(),
        NavbarModule,
        routing
    ],
    declarations: [CategoryComponent, CategoryListComponent, CategoryCreateComponent, CategoryModifyComponent]
})
export class CategoryModule { }