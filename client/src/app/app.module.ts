import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CoreModule }   from './core/core.module';
import { AppRoutingModule }  from './app.routing';

import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,   
    CoreModule,
    LoginModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
