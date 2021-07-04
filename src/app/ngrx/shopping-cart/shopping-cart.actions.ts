import { createAction, props } from '@ngrx/store';
import { ICartItem } from './shopping-cart.interface';

export const addProduct = createAction('[Cart] Add Product', props<{ product: ICartItem }>());
export const setProductQuantity = createAction(
  '[Cart] Set Product Quantity',
  props<{ quantity: number, product: ICartItem }>()
);
export const deleteProduct = createAction('[Cart] Delete Product', props<{ product: ICartItem }>());
export const clearCart = createAction('[Cart] Clear Cart');
