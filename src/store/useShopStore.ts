import { create } from "zustand";
import { ShopStore } from "@/Interface/interface";
import { products } from "@/assets/frontend_assets/assets";

export const useShopStore = create<ShopStore>((set) => ({
  // Product-related state
  products: products,
  currency: "$",
  deliveryFee: 10,
  search: "",
  showSearch: false,
  setSearch: (value) => set({ search: value }),
  setShowSearch: (value) => set({ showSearch: value }),
  navigate: undefined,
  setNavigate: (navigate) => set({ navigate }),

  // Cart-related state
  cart: [],
  totalItems: 0,

  // Add to cart function
  addToCart: (item) =>
    set((state) => {
      if (!item._id || !item.size) {
        console.error("Invalid item added to cart:", item);
        return state;
      }

      // Check if item already exists in cart (by _id and size)
      const existingItem = state.cart.find(
        (cartItem) => cartItem._id === item._id && cartItem.size === item.size
      );

      let updatedCart;
      if (existingItem) {
        // If item exists, increase quantity
        updatedCart = state.cart.map((cartItem) =>
          cartItem._id === item._id && cartItem.size === item.size
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Add new item with quantity 1
        updatedCart = [
          ...state.cart,
          { ...item, quantity: 1, addedAt: Date.now() },
        ];
      }

      // Update totalItems by summing quantities of all cart items
      const updatedTotalItems = updatedCart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      return {
        cart: updatedCart,
        totalItems: updatedTotalItems,
      };
    }),

  // Decrease quantity of an item or remove it from the cart
  decreaseQuantity: (productId, size) =>
    set((state) => {
      const existingItem = state.cart.find(
        (item) => item._id === productId && item.size === size
      );

      if (!existingItem) return state;

      let updatedCart;
      if (existingItem.quantity === 1) {
        // If quantity is 1, remove the item from the cart
        updatedCart = state.cart.filter(
          (item) => !(item._id === productId && item.size === size)
        );
      } else {
        // Otherwise, decrease the quantity
        updatedCart = state.cart.map((item) =>
          item._id === productId && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }

      // Update totalItems by summing quantities of all cart items
      const updatedTotalItems = updatedCart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      return {
        cart: updatedCart,
        totalItems: updatedTotalItems,
      };
    }),

  // Remove item from cart
  removeFromCart: (productId, size) =>
    set((state) => {
      const removedItem = state.cart.find(
        (item) => item._id === productId && item.size === size
      );

      if (!removedItem) return state;

      return {
        cart: state.cart.filter(
          (item) => !(item._id === productId && item.size === size)
        ),
        totalItems: state.totalItems - removedItem.quantity,
      };
    }),
  clearCart: () => set({ cart: [], totalItems: 0 }),
}));

export const navigate = (to: string) => {
  const nav = useShopStore.getState().navigate;
  if (!nav) {
    console.error("Navigation not initialized!");
    return;
  }
  nav(to);
};
