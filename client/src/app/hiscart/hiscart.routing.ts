import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HisCartComponent } from './hiscart.component';

const routes: Routes = [
    { path: '', redirectTo: 'hiscart', pathMatch: 'full' },
    { path: 'hiscart', component: HisCartComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class HisCartRoutingModule { }