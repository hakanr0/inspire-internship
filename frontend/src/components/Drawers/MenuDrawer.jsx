import { SwipeableDrawer } from "@mui/material";
import { NavLink } from "react-router-dom";

import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";

// ICONS
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

export default function MenuDrawer({ open, toggle }) {
  const dispatch = useDispatch();

  const navLinkCss =
    "flex items-center gap-2 p-2 rounded-lg hover:gap-3 duration-200";

  const navItems = [
    { to: "/", title: "Home", icon: <HomeIcon /> },
    { to: "/new", title: "Create New Transaction", icon: <AddIcon /> },
    { to: "/auth", title: "Login/Signup", icon: <PersonIcon /> },
  ];

  const handleLogout = async () => {
    const response = await fetch("http://localhost:8080/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const result = await response.json();
    console.log(result);
    dispatch(userActions.logout());
  };

  return (
    <SwipeableDrawer
      open={open}
      onClose={() => toggle(false)}
      slotProps={{
        paper: {
          sx: {
            background: "#def2fc",
          },
        },
      }}
    >
      <nav className="flex flex-col gap-2 w-80 h-fit p-4 rounded-lg bg-[#def2fc] text-slate-900">
        {navItems?.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={navLinkCss}
            title={item.title}
            onClick={() => toggle(false)}
          >
            {item.icon}
            {item.title}
          </NavLink>
        ))}
        <button className={`${navLinkCss} text-red-600 cursor-pointer`}>
          <LogoutIcon /> Logout
        </button>
      </nav>
    </SwipeableDrawer>
  );
}
