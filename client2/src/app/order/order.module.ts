import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { MomentModule } from 'ngx-moment';

import { OrderComponent } from './order.component';
import { OrderListComponent } from './order-list.component';
import { OrderRoutingModule } from './order.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdMobileModule,
    MomentModule,
    OrderRoutingModule
  ],
  declarations: [
    OrderComponent, 
    OrderListComponent
  ]
})
export class OrderModule { }