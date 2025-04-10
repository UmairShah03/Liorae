// src/components/Checkout/PlaceOrder.tsx
import { useState } from "react";
import { useShopStore } from "@/store/useShopStore";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "@/assets/frontend_assets/assets";
import Title from "@/components/Title";

const PlaceOrder = () => {
  const { cart, totalItems, currency, deliveryFee, clearCart } = useShopStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    paymentMethod: "COD",
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    navigate("/order-success");
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl mb-4">Your cart is empty</p>
        <Link
          to="/collection"
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 md:py-8 grid md:grid-cols-3 gap-4 md:gap-8">
      {/* Customer Information */}
      <form
        onSubmit={handleSubmit}
        className="md:col-span-2 space-y-4 md:space-y-6"
      >
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
          <Title txt1="CUSTOMER" txt2="INFORMATION" />
        </h2>

        <div className="grid gap-2 md:gap-4 grid-cols-1">
          <div className="space-y-2 md:space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium mb-1 md:mb-2"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                required
                className="w-full p-2 text-sm md:text-base border rounded focus:ring-2 focus:ring-black"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-1 md:mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full p-2 text-sm md:text-base border rounded focus:ring-2 focus:ring-black"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid gap-2 md:gap-4 grid-cols-1">
            <div>
              <label
                htmlFor="streetAddress"
                className="block text-sm font-medium mb-1 md:mb-2"
              >
                Street Address
              </label>
              <input
                id="streetAddress"
                type="text"
                required
                className="w-full p-2 text-sm md:text-base border rounded focus:ring-2 focus:ring-black"
                placeholder="123 Main Street"
                value={formData.street}
                onChange={(e) =>
                  setFormData({ ...formData, street: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium mb-1 md:mb-2"
                >
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  required
                  className="w-full p-2 text-sm md:text-base border rounded focus:ring-2 focus:ring-black"
                  placeholder="Your City"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium mb-1 md:mb-2"
                >
                  State
                </label>
                <input
                  id="state"
                  type="text"
                  required
                  className="w-full p-2 text-sm md:text-base border rounded focus:ring-2 focus:ring-black"
                  placeholder="Your State"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium mb-1 md:mb-2"
                >
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  required
                  className="w-full p-2 text-sm md:text-base border rounded focus:ring-2 focus:ring-black"
                  placeholder="Your Country"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium mb-1 md:mb-2"
                >
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  required
                  className="w-full p-2 text-sm md:text-base border rounded focus:ring-2 focus:ring-black"
                  placeholder="123-456-789"
                  pattern="[+0-9\s\-\(\)]{10,}"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mt-4 md:mt-8">
          <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">
            Payment Method
          </h3>
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-center gap-2 p-2 md:p-4 border rounded">
              <input
                id="cod"
                type="radio"
                name="payment"
                value="COD"
                checked={formData.paymentMethod === "COD"}
                onChange={() =>
                  setFormData({ ...formData, paymentMethod: "COD" })
                }
                className="w-4 h-4"
              />
              <label
                htmlFor="cod"
                id="cod-label"
                className="ml-2 text-sm md:text-base"
              >
                Cash on Delivery (COD)
              </label>
            </div>

            <div className="flex items-center gap-2 p-2 md:p-4 border rounded">
              <input
                id="stripe"
                type="radio"
                name="payment"
                value="stripe"
                checked={formData.paymentMethod === "stripe"}
                onChange={() =>
                  setFormData({ ...formData, paymentMethod: "stripe" })
                }
                className="w-4 h-4"
              />
              <label
                htmlFor="stripe"
                id="stripe-label"
                className="flex items-center ml-2"
              >
                <img
                  src={assets.stripe_logo}
                  className="h-4 md:h-5 mx-2 md:mx-4"
                  alt="Stripe payment"
                />
                <span className="text-sm md:text-base">Credit/Debit Card</span>
              </label>
            </div>

            {formData.paymentMethod === "stripe" && (
              <div className="p-2 md:p-4 border rounded bg-gray-50 text-sm md:text-base">
                <p className="text-gray-600">
                  Secure Stripe payment processing will be added later
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 md:py-3 mt-4 md:mt-8 hover:bg-gray-800 transition-colors text-sm md:text-base"
        >
          Place Order
        </button>
      </form>

      {/* Order Summary */}
      <div className="md:sticky md:top-20 h-fit order-first md:order-last mb-4 md:mb-0">
        <div className="bg-gray-50 p-4 md:p-6 rounded-lg border">
          <h2 className="text-lg md:text-xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-2 md:space-y-4">
            <div className="flex justify-between text-sm md:text-base">
              <span>Items ({totalItems}):</span>
              <span>
                {currency}
                {subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between text-sm md:text-base">
              <span>Delivery:</span>
              <span>
                {currency}
                {deliveryFee.toFixed(2)}
              </span>
            </div>

            <hr className="my-2 md:my-4" />

            <div className="flex justify-between font-bold text-sm md:text-base">
              <span>Total:</span>
              <span>
                {currency}
                {total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-4 md:mt-6 space-y-1 md:space-y-2">
            {cart.map((item) => (
              <div
                key={`${item._id}-${item.size}`}
                className="flex justify-between text-xs md:text-sm"
              >
                <span className="max-w-[70%] truncate">
                  {item.name} ({item.size}) × {item.quantity}
                </span>
                <span>
                  {currency}
                  {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
