import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TakeOutComponent } from './takeout.component';

const routes: Routes = [
    { path: '', redirectTo: 'takeout', pathMatch: 'full' },
    { path: 'takeout', component: TakeOutComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class TakeOutRoutingModule { }