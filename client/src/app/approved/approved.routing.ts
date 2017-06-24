import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovedComponent } from './approved.component';

const routes: Routes = [
    { path: '', redirectTo: 'approved', pathMatch: 'full' },
    { path: 'approved', component: ApprovedComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ApprovedRoutingModule { }