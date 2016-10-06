import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CoreModule }   from './core/core.module';
import { routing }  from './app.routing';

import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,   
    CoreModule,
    LoginModule,
    routing
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
