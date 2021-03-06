import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  tabbarStyle: object = {
    position: 'fixed',
    height: '100%',
    width: '100%',
    top: 0
  };

  constructor(private router: Router) { }

  ngOnInit() {
  }

  tabBarTabOnPress(pressParam: any) {
    console.log('onPress Params: ', pressParam);
    if (pressParam.key === 'order') {
      this.router.navigate(['/order']);
    } else if (pressParam.key === 'cart') {
      this.router.navigate(['/cart']);
    } else if (pressParam.key === 'product') {
      this.router.navigate(['/product/-1']);
    } else if (pressParam.key === 'my') {
      this.router.navigate(['/my']);
    }
  }

}
