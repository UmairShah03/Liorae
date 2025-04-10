import Title from "./Title";
import { useEffect, useState } from "react";
import { Product } from "@/Interface/interface";
import ProductItem from "./ProductItem";
import { useShopStore } from "@/store/useShopStore";

const LatestCollection = () => {
  const { products } = useShopStore();
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, []);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title txt1="LATEST" txt2="COLLECTIONS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600  ">
          Discover the essence of style with our latest collection—where
          innovation meets elegance!
        </p>
      </div>
      {/* Renedered Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item) => (
          <ProductItem
            key={item._id}
            _id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
