import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscountComponent } from './discount.component';

const routes: Routes = [
    { path: '', redirectTo: 'discount', pathMatch: 'full' },
    { path: 'discount', component: DiscountComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class DiscountRoutingModule { }