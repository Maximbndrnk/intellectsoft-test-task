import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICart, ICartItem } from '../ngrx/shopping-cart/shopping-cart.interface';
import { selectCarts } from '../ngrx/shopping-cart/shopping-cart.selectors';
import { deleteProduct, setProductQuantity } from '../ngrx/shopping-cart/shopping-cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public products: ICartItem[] = [];

  constructor(
    private store: Store<ICart>,
  ) {
  }

  ngOnInit(): void {
    this.store.select(selectCarts).subscribe((resp) => {
      // @ts-ignore
      this.products = resp.cart;
    });
  }

  removeItem(p: ICartItem) {
    this.store.dispatch(deleteProduct({ product: p }));
  }

  setQuantity($event: Event, p: ICartItem) {
    // @ts-ignore
    this.store.dispatch(setProductQuantity({quantity: +$event.target.value, product: p}))
  }
}
