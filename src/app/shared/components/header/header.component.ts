import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ICart } from '../../../ngrx/shopping-cart/shopping-cart.interface';
import { selectCarts } from '../../../ngrx/shopping-cart/shopping-cart.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public cartItemsQuantity = 0;

  constructor(
    private router: Router,
    private store: Store<ICart>
  ) {
  }

  ngOnInit(): void {
    this.store.select(selectCarts).subscribe((resp) => {
      // @ts-ignore
      this.cartItemsQuantity = resp.cart.length;
    });
  }

  goToCart() {
    this.router.navigateByUrl('cart');

  }
}
