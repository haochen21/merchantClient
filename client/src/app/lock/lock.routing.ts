import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LockComponent } from './lock.component';

const routes: Routes = [
    { path: '', redirectTo: 'lock', pathMatch: 'full' },
    { path: 'lock', component: LockComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class LockRoutingModule { }