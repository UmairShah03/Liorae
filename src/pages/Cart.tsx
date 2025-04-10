import CartItems from "@/components/CartItems";
import OrderSummary from "@/components/OrderSummary";
import Title from "@/components/Title";
import { useShopStore } from "@/store/useShopStore";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useShopStore((state) => state.cart);
  const totalItems = useShopStore((state) => state.totalItems);

  return (
    <div className="container mx-auto px-4 py-8 gap-3">
      <h1 className="text-3xl font-bold mb-8">
        <Title txt1="YOUR" txt2="CART" /> ({totalItems} items)
      </h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-xl mb-4">Your cart is empty</p>
          <Link
            to="/collection"
            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-8">
          {/* Cart Items */}
          <CartItems />
          {/* Order Summary */}
          <OrderSummary />
        </div>
      )}
    </div>
  );
};

export default Cart;
