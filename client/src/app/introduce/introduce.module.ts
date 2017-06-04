import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { NavbarModule } from '../navbar/navbar.module';
import { MaterialModule } from '@angular/material';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { TabsModule } from 'ng2-bootstrap';
import { ToastyModule } from 'ng2-toasty';

import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';

import { IntroduceComponent } from './introduce.component';
import { IntroduceRoutingModule } from './introduce.routing';

@NgModule({
    imports: [
        SharedModule,
        MaterialModule.forRoot(),
        TabsModule.forRoot(),
        SlimLoadingBarModule.forRoot(),
        FroalaEditorModule.forRoot(), 
        FroalaViewModule.forRoot(),
        ToastyModule.forRoot(),
        NavbarModule,
        IntroduceRoutingModule
    ],
    declarations: [ IntroduceComponent ]
})
export class IntroduceModule { }