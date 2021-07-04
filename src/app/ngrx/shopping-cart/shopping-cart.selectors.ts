import { ICart } from './shopping-cart.interface';
import { createSelector } from '@ngrx/store';


export const selectCart = (state: ICart) => state;

export const selectCarts = createSelector(
  selectCart,
  (state: ICart) => state.cart
);
