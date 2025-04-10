import { Link } from "react-router-dom";
import { useShopStore } from "@/store/useShopStore";
import ProductItem from "./ProductItem";
import { useMemo } from "react";
import Title from "./Title";

interface RelatedProductsProps {
  currentProductId: string;
}

const RelatedProducts = ({ currentProductId }: RelatedProductsProps) => {
  const { products } = useShopStore();

  // Memoized product data calculation
  const { currentProduct, relatedProducts } = useMemo(() => {
    const current = products.find((p) => p._id === currentProductId);

    const related = current
      ? products
          .filter(
            (product) =>
              product._id !== currentProductId &&
              product.category === current.category &&
              product.subCategory === current.subCategory
          )
          .slice(0, 5)
      : [];

    return { currentProduct: current, relatedProducts: related };
  }, [products, currentProductId]);

  if (!currentProduct || relatedProducts.length === 0) return null;

  return (
    <section
      aria-labelledby="related-products-heading"
      className="mt-16 border-t pt-10"
    >
      <h2 id="related-products-heading" className="text-3xl text-center mb-6">
        <Title txt1="RELATED" txt2="PRODUCTS" />
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-4">
        {relatedProducts.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="group relative block"
            aria-label={`View ${product.name} details`}
            title={product.name}
          >
            <ProductItem
              _id={product._id}
              name={product.name}
              image={product.image}
              price={product.price}
              linkable={false}
            />
            {product.bestseller && (
              <span className="absolute top-2 left-2 bg-white px-2 py-1 text-xs font-medium shadow-sm">
                Bestseller
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
