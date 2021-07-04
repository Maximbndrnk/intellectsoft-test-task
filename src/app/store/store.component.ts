import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../shared/interfaces/product.interface';
import { Store } from '@ngrx/store';
import { ICart, ICartItem } from '../ngrx/shopping-cart/shopping-cart.interface';
import { addProduct } from '../ngrx/shopping-cart/shopping-cart.actions';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  public isLoading = false;
  public products: IProduct[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<ICart>
  ) {
  }

  ngOnInit(): void {
    this.products = this.route.snapshot.data.products;
  }

  addItemToCart(i: number) {
    const item: ICartItem = {
      ...this.products[i],
      quantity: 1,
    };
    this.store.dispatch(addProduct({ product: item }));
  }
}
