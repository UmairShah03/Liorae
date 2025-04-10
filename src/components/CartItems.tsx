import { useShopStore } from "@/store/useShopStore";
import { LuTrash2 } from "react-icons/lu";

const CartItems = () => {
  const cart = useShopStore((state) => state.cart);
  const currency = useShopStore((state) => state.currency);
  const addToCart = useShopStore((state) => state.addToCart);
  const removeFromCart = useShopStore((state) => state.removeFromCart);
  const decreaseQuantity = useShopStore((state) => state.decreaseQuantity);

  return (
    <div className="space-y-6">
      {cart.map((item) => (
        <div
          key={`${item._id}-${item.size}`}
          className="flex gap-4 border-b pb-6"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h3 className="font-medium text-lg">{item.name}</h3>
            <p className="text-sm text-gray-600">Size: {item.size}</p>
            <p className="text-lg font-bold mt-2">
              {currency}
              {item.price.toFixed(2)}
            </p>

            <div className="flex items-center gap-4 mt-3">
              <button
                onClick={() => decreaseQuantity(item._id, item.size)}
                className="px-3 py-1 border rounded hover:bg-gray-700"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() =>
                  addToCart({
                    _id: item._id,
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    size: item.size,
                  })
                }
                className="px-3 py-1 border rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
          <LuTrash2
            size={24}
            onClick={() => removeFromCart(item._id, item.size)}
          />
        </div>
      ))}
    </div>
  );
};

export default CartItems;
