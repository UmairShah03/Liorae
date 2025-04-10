import ProductItem from "@/components/ProductItem";
import Title from "@/components/Title";
import { useShopStore } from "@/store/useShopStore";
import { useMemo, useState } from "react";
import { LuArrowRight } from "react-icons/lu";

const Collection = () => {
  const { products, search } = useShopStore();
  const [filter, setfilter] = useState(false);
  const [category, setCategory] = useState<string[]>([]);
  const [subcategory, setSubCategory] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("relevant");
  const [initialProducts] = useState(products);

  const handleToggle = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...initialProducts];

    // Filter by category
    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }

    // Filter by subcategory
    if (subcategory.length > 0) {
      filtered = filtered.filter((item) =>
        subcategory.includes(item.subCategory)
      );
    }
    //Search Filter
    if (search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    switch (sortOption) {
      case "high-low":
        filtered = filtered.sort((a, b) => b.price - a.price); // High to low
        break;
      case "low-high":
        filtered = filtered.sort((a, b) => a.price - b.price); // Low to high
        break;
      case "relevant":
      default:
        break;
    }

    return filtered;
  }, [products, category, subcategory, sortOption, search]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Option */}
      <div className="min-w-60">
        <p
          onClick={() => setfilter(!filter)}
          className="text-xl my-2 flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <LuArrowRight
            className={`h-3 sm:hidden ${filter ? "rotate-90" : ""}`}
            size={18}
          />
        </p>
        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            filter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-2 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light">
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Men"}
                className="w-3"
                title="Men"
                onChange={(e) => handleToggle(e.target.value, setCategory)}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Women"}
                className="w-3"
                title="Women"
                onChange={(e) => handleToggle(e.target.value, setCategory)}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Kids"}
                className="w-3"
                title="Kids"
                onChange={(e) => handleToggle(e.target.value, setCategory)}
              />
              Kids
            </p>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            filter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-2 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light">
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Topwear"}
                className="w-3"
                title="Topwear"
                onChange={(e) => handleToggle(e.target.value, setSubCategory)}
              />
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Bottomwear"}
                className="w-3"
                title="Bottomwear"
                onChange={(e) => handleToggle(e.target.value, setSubCategory)}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Winterwear"}
                className="w-3"
                title="Winterwear"
                onChange={(e) => handleToggle(e.target.value, setSubCategory)}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* COllection Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title txt1="ALL" txt2="COLLECTION" />
          {/* Sorting */}
          <select
            title="Sort by"
            className="border-2 border-gray-300 text-sm px-2"
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="relevant">Sort by : Relevant</option>
            <option value="high-low">Sort by : High to Low</option>
            <option value="low-high">Sort by : Low to High</option>
          </select>
        </div>
        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filteredProducts.map((item) => (
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
    </div>
  );
};

export default Collection;
