// src/components/Orders/OrderHistory.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useShopStore } from "@/store/useShopStore";
import Title from "@/components/Title";

const OrderHistory = () => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const { products, currency, deliveryFee } = useShopStore();

  // Demo orders using store products
  const demoOrders = [
    {
      orderNumber: "ORD-2024-001",
      date: new Date().toISOString(),
      currency,
      deliveryFee,
      total:
        products.slice(0, 3).reduce((sum, product) => sum + product.price, 0) +
        10,
      items: products.slice(0, 3).map((product) => ({
        _id: product._id,
        name: product.name,
        size: "M",
        quantity: 1,
        price: product.price,
      })),
      customerInfo: {
        name: "John Doe",
        email: "john@example.com",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        country: "USA",
        phone: "+1 555-123-4567",
      },
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        <Title txt1="MY" txt2="ORDERS" />
      </h1>
      <h3 className="text-2xl font-bold mb-3">DEMO ORDERS</h3>

      <div className="space-y-6">
        {demoOrders.map((order) => (
          <div
            key={order.orderNumber}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
              onClick={() =>
                setExpandedOrder(
                  expandedOrder === order.orderNumber ? null : order.orderNumber
                )
              }
            >
              <div>
                <h3 className="font-medium text-lg">
                  Order #{order.orderNumber}
                </h3>
                <p className="text-sm text-gray-600">
                  {new Date(order.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <span
                className={`transform transition-transform ${
                  expandedOrder === order.orderNumber ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </div>

            {expandedOrder === order.orderNumber && (
              <div className="p-4 border-t">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Order Items */}
                  <div>
                    <h4 className="font-medium mb-4">Order Details</h4>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div
                          key={item._id}
                          className="flex justify-between text-sm py-2 border-b"
                        >
                          <span>
                            {item.name} ({item.size}) × {item.quantity}
                          </span>
                          <span>
                            {order.currency}
                            {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div>
                    <h4 className="font-medium mb-4">Customer Information</h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Name:</strong> {order.customerInfo.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {order.customerInfo.email}
                      </p>
                      <p>
                        <strong>Address:</strong> {order.customerInfo.street},{" "}
                        {order.customerInfo.city}
                      </p>
                      <p>
                        <strong>Phone:</strong> {order.customerInfo.phone}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t">
                      <div className="flex justify-between font-medium">
                        <span>Subtotal:</span>
                        <span>
                          {order.currency}
                          {order.items
                            .reduce(
                              (sum, item) => sum + item.price * item.quantity,
                              0
                            )
                            .toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Delivery:</span>
                        <span>
                          {order.currency}
                          {order.deliveryFee}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold mt-2">
                        <span>Total:</span>
                        <span>
                          {order.currency}
                          {order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {demoOrders.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl mb-4">No orders found</p>
          <Link
            to="/collection"
            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
