import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffTimeComponent } from './offtime.component';

const routes: Routes = [
    { path: '', redirectTo: 'offtime', pathMatch: 'full' },
    { path: 'offtime', component: OffTimeComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class OffTimeRoutingModule { }