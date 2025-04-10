import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import {
  LuCircleUserRound,
  LuMenu,
  LuSearch,
  LuShoppingBag,
} from "react-icons/lu";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { navLinks } from "@/constants/navLinks";
import { useShopStore } from "@/store/useShopStore";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const setShowSearch = useShopStore((state) => state.setShowSearch);
  const totalItems = useShopStore((state) => state.totalItems);

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to={"/"}>
        <img src={assets.logo} className="w-36" alt="logo" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {navLinks.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className="flex flex-col items-center gap-1"
            >
              <p>{link.name}</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-6">
        <LuSearch
          className="cursor-pointer"
          size={24}
          onClick={() => setShowSearch(true)}
        />
        <div className="group relative">
          <Link to={"/login"}>
            <LuCircleUserRound className="cursor-pointer" size={24} />
          </Link>
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col bg-slate-100 gap-2 w-36 py-2 px-5 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">MyProfile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <LuShoppingBag size={24} />
          {totalItems > 0 && (
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {totalItems}
            </p>
          )}
        </Link>
        <LuMenu
          onClick={() => setVisible(true)}
          className="sm:hidden cursor-pointer"
          size={24}
        />
      </div>
      {/* SideBarMenu */}
      <div
        className={`absolute top-0 bottom-0 right-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <Sidebar setVisible={setVisible} />
      </div>
    </div>
  );
};

export default Navbar;
