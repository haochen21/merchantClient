import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifyPasswordComponent } from './modify-password.component';

const routes: Routes = [
    { path: '', redirectTo: 'modifypassword', pathMatch: 'full' },
    { path: 'modifypassword', component: ModifyPasswordComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ModifyPasswordRoutingModule { }