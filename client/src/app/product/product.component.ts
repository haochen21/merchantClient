import { Component } from '@angular/core';

import { StoreService } from '../core/store.service';

@Component({
    selector: 'product',
    providers:  [StoreService],
    template: `       
      <router-outlet></router-outlet>
      <ticket-navbar></ticket-navbar>
    `
})
export class ProductComponent { }