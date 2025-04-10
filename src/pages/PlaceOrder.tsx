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
    paymentMethod: "COD", // Default to Cash on Delivery
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clear cart and redirect to success page
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
    <div className="container mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
      {/* Customer Information */}
      <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
        <h2 className="text-2xl font-bold mb-6">
          <Title txt1="CUSTOMER" txt2="INFORMATION" />
        </h2>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium mb-2"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              required
              className="w-full p-2 border rounded"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full p-2 border rounded"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              aria-required="true"
            />
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div>
            <label
              htmlFor="streetAddress"
              className="block text-sm font-medium mb-2"
            >
              Street Address
            </label>
            <input
              id="streetAddress"
              type="text"
              required
              className="w-full p-2 border rounded"
              placeholder="123 Main Street"
              value={formData.street}
              onChange={(e) =>
                setFormData({ ...formData, street: e.target.value })
              }
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium mb-2">
              City
            </label>
            <input
              id="city"
              type="text"
              required
              className="w-full p-2 border rounded"
              placeholder="Your City"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              aria-required="true"
            />
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <div>
            <label htmlFor="state" className="block text-sm font-medium mb-2">
              State
            </label>
            <input
              id="state"
              type="text"
              required
              className="w-full p-2 border rounded"
              placeholder="Your State"
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium mb-2">
              Country
            </label>
            <input
              id="country"
              type="text"
              required
              className="w-full p-2 border rounded"
              placeholder="Your Country"
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
              aria-required="true"
            />
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium mb-2"
            >
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="tel"
              required
              className="w-full p-2 border rounded"
              placeholder="123-456-789"
              pattern="[+0-9\s\-\(\)]{10,}"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              aria-required="true"
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 border rounded">
              <input
                id="cod"
                type="radio"
                name="payment"
                value="COD"
                checked={formData.paymentMethod === "COD"}
                onChange={() =>
                  setFormData({ ...formData, paymentMethod: "COD" })
                }
                aria-labelledby="cod-label"
              />
              <label htmlFor="cod" id="cod-label">
                Cash on Delivery (COD)
              </label>
            </div>

            <div className="flex items-center gap-3 p-4 border rounded">
              <input
                id="stripe"
                type="radio"
                name="payment"
                value="stripe"
                checked={formData.paymentMethod === "stripe"}
                onChange={() =>
                  setFormData({ ...formData, paymentMethod: "stripe" })
                }
                aria-labelledby="stripe-label"
              />
              <label
                htmlFor="stripe"
                id="stripe-label"
                className="flex items-center"
              >
                <img
                  src={assets.stripe_logo}
                  className="h-5 mx-4"
                  alt="Stripe payment gateway logo"
                  aria-hidden="true"
                />
                Credit/Debit Card
              </label>
            </div>

            {/* Add Stripe elements here later */}
            {formData.paymentMethod === "stripe" && (
              <div className="p-4 border rounded bg-gray-50">
                <p className="text-sm text-gray-600">
                  Secure Stripe payment processing will be added later
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 mt-8 hover:bg-gray-800 transition-colors"
        >
          Place Order
        </button>
      </form>

      {/* Order Summary */}
      <div className="md:sticky md:top-20 h-fit">
        <div className="bg-gray-50 p-6 rounded-lg border">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Items ({totalItems}):</span>
              <span>
                {currency}
                {subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Delivery:</span>
              <span>
                {currency}
                {deliveryFee.toFixed(2)}
              </span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>
                {currency}
                {total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            {cart.map((item) => (
              <div
                key={`${item._id}-${item.size}`}
                className="flex justify-between text-sm"
              >
                <span>
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
