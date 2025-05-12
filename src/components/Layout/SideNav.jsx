import { NavLink } from "react-router-dom";

// ICONS
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";

export default function SideNav() {
  const navLinkCss =
    "flex items-center gap-2 p-2 rounded-lg hover:gap-3 duration-200";

  const navItems = [
    { to: "/", title: "Home", icon: <HomeIcon /> },
    { to: "/new", title: "Create New Transaction", icon: <AddIcon /> },
    { to: "/auth", title: "Login/Signup", icon: <PersonIcon /> },
  ];

  return (
    <nav className="flex flex-col gap-2 w-96 h-fit p-4 rounded-lg bg-[#def2fc] text-slate-900 max-lg:w-fit max-md:hidden">
      {navItems?.map((item, index) => (
        <NavLink
          key={index}
          to={item.to}
          className={navLinkCss}
          title={item.title}
        >
          {item.icon}
          <span className="max-lg:hidden">{item.title}</span>
        </NavLink>
      ))}
    </nav>
  );
}
