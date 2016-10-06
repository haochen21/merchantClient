import { Component } from '@angular/core';

@Component({
    selector: 'cateogry',
    template: `       
      <router-outlet></router-outlet>
    `,
    styles: ['.header { background: #3090e6; color: #fff; height: 40px;line-height: 40px;padding-top: 4px;}']
})
export class CategoryComponent { }