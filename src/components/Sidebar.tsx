import { navLinks } from "@/constants/navLinks";
import { LuArrowLeft } from "react-icons/lu";
import { NavLink } from "react-router-dom";

interface sideBarProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ setVisible }: sideBarProps) => {
  return (
    <div className="flex flex-col text-gray-500">
      <div
        className="flex items-center gap-4 p-3 cursor-pointer"
        onClick={() => setVisible(false)}
      >
        <LuArrowLeft className="h-4 mt-0.5" />
        <p>Back</p>
      </div>
      <>
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
          >
            {link.name}
          </NavLink>
        ))}
      </>
    </div>
  );
};

export default Sidebar;
