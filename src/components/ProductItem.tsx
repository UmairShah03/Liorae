import { ProductItemProps } from "@/Interface/interface";
import { useShopStore } from "@/store/useShopStore";
import { Link } from "react-router-dom";

const ProductItem = ({
  _id,
  image,
  name,
  price,
  linkable = true,
}: ProductItemProps) => {
  const { currency } = useShopStore();

  const content = (
    <div className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden">
        <img
          alt="product"
          src={image[0]}
          className="hover:scale-110 transition ease-in-out"
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="font-medium text-sm">
        {currency}
        {price}
      </p>
    </div>
  );
  return linkable ? <Link to={`/product/${_id}`}>{content}</Link> : content;
};

export default ProductItem;
