export interface ICartItem {
  id: number;
  name: string;
  image: string;
  quantity?: number;
}

export interface ICart {
  cart: ICartItem[];
}
