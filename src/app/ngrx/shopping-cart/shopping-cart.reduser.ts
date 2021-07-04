import { ICart, ICartItem } from './shopping-cart.interface';
import { createReducer, on, props } from '@ngrx/store';
import { addProduct, clearCart, deleteProduct, setProductQuantity } from './shopping-cart.actions';

export const initialState: ICart = {
  cart: [
    {
      quantity: 2,
      'id': 1,
      'name': 'Black phone',
      'image': 'https://i.allo.ua/media/catalog/product/cache/3/small_image/212x184/9df78eab33525d08d6e5fb8d27136e95/1/2/123123123_11.jpg'
    },
    {
      quantity: 1,
      'id': 2,
      'name': 'Sky phone',
      'image': 'https://i.allo.ua/media/catalog/product/cache/3/small_image/212x184/9df78eab33525d08d6e5fb8d27136e95/3/4/345345345_2_1.jpg'
    },
    {
      quantity: 1,
      'id': 3,
      'name': 'Green phone',
      'image': 'https://i.allo.ua/media/catalog/product/cache/3/small_image/212x184/9df78eab33525d08d6e5fb8d27136e95/0/_/0_59_16_1_1.jpg'
    },
  ],
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
      p[itemIndex] = {
        ...p[itemIndex],
        quantity: quantity
      };
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
