import { ICart, ICartItem } from './shopping-cart.interface';
import { createReducer, on, props } from '@ngrx/store';
import { addProduct, clearCart, deleteProduct, setProductQuantity } from './shopping-cart.actions';

export const initialState: ICart = {
  cart: [],
};

const _cartReducer = createReducer(
  initialState,
  on(addProduct, (state, { product }) => {
    const p = [...state.cart];
    const isAlreadyInListIndex = p.findIndex((item: ICartItem) => item.id === product.id);
    if (isAlreadyInListIndex === -1) {
      p.push(product);
    }
    return {
      cart: p
    };
  }),
  on(setProductQuantity, (state, { quantity, product }) => {
    const p = [...state.cart];
    const itemIndex = p.findIndex((item: ICartItem) => item.id === product.id);
    if (itemIndex !== -1) {
      p[itemIndex].quantity = quantity;
    }
    return {
      cart: p
    };
  }),
  on(deleteProduct, (state, { product }) => {
    const p = [...state.cart];
    const itemIndex = p.findIndex((item: ICartItem) => item.id === product.id);
    if (itemIndex !== -1) {
      p.splice(itemIndex, 1);
    }
    return {
      cart: p
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
