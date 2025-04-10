import { NavigateFunction } from "react-router-dom";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string[];
  date: number;
  bestseller: boolean;
}

export type ProductItemProps = {
  _id: string;
  image: string[];
  name: string;
  price: number;
  linkable?: boolean;
};

// Cart Item

export type CartItem = {
  _id: string;
  name: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
};

export type ShopStore = {
  products: Product[];
  currency: string;
  deliveryFee: number;
  search: string;
  showSearch: boolean;
  setSearch: (value: string) => void;
  setShowSearch: (value: boolean) => void;
  cart: CartItem[];
  clearCart: () => void;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  totalItems: number;
  removeFromCart: (productId: string, size: string) => void;
  decreaseQuantity: (productId: string, size: string) => void;
  navigate?: NavigateFunction;
  setNavigate: (navigate: NavigateFunction) => void;
};
