import RelatedProducts from "@/components/RelatedProducts";
import StarRating from "@/components/StarRating";
import { Product as ProductType } from "@/Interface/interface";
import { useShopStore } from "@/store/useShopStore";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useShopStore();
  const [productData, setProductData] = useState<ProductType | null>(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  useEffect(() => {
    if (!productId) return;

    const foundProduct = products.find((item) => item._id === productId);

    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0] || "");
    } else {
      setProductData(null);
      setImage("");
      console.error(`Product with ID ${productId} not found`);
    }
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Data */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          {/* Product Images */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal gap-3 sm:w-[18.7%]  ">
            {productData.image.map((item, index) => (
              <img
                src={item}
                alt="Product Image"
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                onClick={() => setImage(item)}
              />
            ))}
          </div>
          <div className="w-full sm:[w-80%]">
            <img src={image} alt="main_img" className="w-full h-auto" />
          </div>
        </div>
        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <StarRating rating={4.5} count={122} />
          </div>
          <p className="text-3xl mt-5 font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-3/4">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Sizes</p>
            <div className="flex gap-2">
              {productData.sizes.map((item) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border px-4 py-2 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={item}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
            onClick={() => {
              if (!size) {
                toast.error("Please Select Size First");
                return;
              }
              addToCart({
                _id: productData._id,
                name: productData.name,
                image: productData.image[0],
                price: productData.price,
                size: size,
              });
            }}
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-3/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% orignal product.</p>
            <p>Cash on delivery is availble.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* Review And  Description */}
      <div className="mt-20">
        <div className="flex gap-2">
          <p className="border px-5 py-3 text-sm">Description</p>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Embrace effortless elegance with our **Floral Midi Wrap Dress**,
            featuring a delicate floral pattern on lightweight, breathable
            fabric. The wrap design ensures a customizable fit, while the midi
            length offers versatility for both casual outings and formal events.
            Pair it with sandals for a daytime look or heels for an evening
            ensemble.
          </p>

          <p>
            Discover the timeless appeal of our **Classic Denim Jacket**,
            crafted from premium cotton denim for durability and comfort. This
            jacket boasts a tailored fit with traditional button closures and
            functional pockets, making it a versatile layering piece for any
            season. Wear it over a summer dress for a casual vibe or pair it
            with trousers for a chic, structured look.
          </p>
        </div>
      </div>
      {/* Related Products */}
      <RelatedProducts currentProductId={productData._id} />
    </div>
  ) : null;
};

export default Product;
