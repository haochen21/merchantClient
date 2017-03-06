import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenTimeComponent } from './opentime.component';

const routes: Routes = [
    { path: '', redirectTo: 'opentime', pathMatch: 'full' },
    { path: 'opentime', component: OpenTimeComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class OpenTimeRoutingModule { }