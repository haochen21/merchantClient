import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifyImageComponent } from './modify-image.component';

const routes: Routes = [
    { path: '', redirectTo: 'modifyimage', pathMatch: 'full' },
    { path: 'modifyimage', component: ModifyImageComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ModifyImageRoutingModule { }