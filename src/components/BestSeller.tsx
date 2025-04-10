import { Product } from "@/Interface/interface";
import { useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { useShopStore } from "@/store/useShopStore";

const BestSeller = () => {
  const { products } = useShopStore();
  const [bestSeller, setBestSeller] = useState<Product[]>([]);

  useEffect(() => {
    setBestSeller(products.filter((item) => item.bestseller).slice(0, 5));
  }, []);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title txt1="BEST" txt2="SELLER" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600  ">
          Your favorites, reimagined—shop our bestsellers that everyone loves!
        </p>
      </div>
      {/* RENDERED BESTSELLER */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item) => (
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

export default BestSeller;
