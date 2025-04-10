import { useShopStore } from "@/store/useShopStore";
import { useEffect } from "react";
import { LuSearch, LuX } from "react-icons/lu";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const search = useShopStore((state) => state.search);
  const setSearch = useShopStore((state) => state.setSearch);
  const showSearch = useShopStore((state) => state.showSearch);
  const setShowSearch = useShopStore((state) => state.setShowSearch);

  const location = useLocation();

  useEffect(() => {
    const shouldShow = location.pathname === "/collection";
    setShowSearch(shouldShow);
  }, [location.pathname, setShowSearch]);

  if (!showSearch) return null;

  return showSearch ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-500 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 outline-none bg-inherit text-sm "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <LuSearch size={18} />
      </div>
      <LuX
        size={22}
        className="inline cursor-pointer"
        onClick={() => setShowSearch(false)}
      />
    </div>
  ) : null;
};

export default SearchBar;
