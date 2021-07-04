import { ICart } from './shopping-cart.interface';
import { createReducer, on } from '@ngrx/store';
import { addProduct, clearCart, deleteProduct } from './shopping-cart.actions';

export const initialState: ICart = {
  cart: [],
};

const _cartReducer = createReducer(
  initialState,
  on(addProduct, (state) => {
    return {
      ...state,
    };
  }),
  on(deleteProduct, (state) => {
    return {
      ...state,
    };
  }),
  on(clearCart, (state) => {
    return {
      cart: [],
    };
  })
);

// @ts-ignore
export function cartReducer(state, action) {
  return _cartReducer(state, action);
}
