import { navigate, useShopStore } from "@/store/useShopStore";

const OrderSummary = () => {
  const cart = useShopStore((state) => state.cart);
  const currency = useShopStore((state) => state.currency);
  const deliveryFee = useShopStore((state) => state.deliveryFee);
  const totalItems = useShopStore((state) => state.totalItems);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + deliveryFee;
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal ({totalItems} items)</span>
          <span>
            {currency}
            {subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span>
            {currency}
            {deliveryFee.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between font-bold border-t pt-3">
          <span>Total</span>
          <span>
            {currency}
            {total.toFixed(2)}
          </span>
        </div>
      </div>

      <button
        onClick={() => navigate("/place-order")}
        className="w-full bg-black text-white py-3 mt-6 hover:bg-gray-800 transition-colors"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
