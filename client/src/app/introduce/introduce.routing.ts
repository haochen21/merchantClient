import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroduceComponent } from './introduce.component';

const routes: Routes = [
    { path: '', redirectTo: 'introduce', pathMatch: 'full' },
    { path: 'introduce', component: IntroduceComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class IntroduceRoutingModule { }