import { SwipeableDrawer } from "@mui/material";
import { NavLink } from "react-router-dom";

// import { useAppSelector } from "../../store/hooks";

// CUSTOM HOOKS
import { useAuth } from "../../hooks/useAuth";

// ICONS
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

type Props = {
  open: boolean;
  toggle: (open: boolean) => void;
};

const MenuDrawer: React.FC<Props> = ({ open, toggle }) => {
  const { handleLogout } = useAuth();
  // const token = useAppSelector((state) => state.user.token);
  const token = localStorage.getItem("token");

  const navLinkCss =
    "flex items-center gap-2 p-2 rounded-lg hover:gap-3 duration-200";

  const navItems = [
    { to: "/", title: "Home", icon: <HomeIcon />, show: true },
    {
      to: "/new",
      title: "Create New Transaction",
      icon: <AddIcon />,
      show: Boolean(token),
    },
    {
      to: "/auth",
      title: "Login/Signup",
      icon: <PersonIcon />,
      show: Boolean(!token),
    },
  ];

  return (
    <SwipeableDrawer
      open={open}
      onOpen={() => {}}
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
        {navItems?.map((item, index) =>
          item.show ? (
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
          ) : null
        )}
        {token && (
          <button
            className={`${navLinkCss} text-red-600 cursor-pointer`}
            onClick={() => {
              handleLogout();
              toggle(false);
            }}
          >
            <LogoutIcon /> Logout
          </button>
        )}
      </nav>
    </SwipeableDrawer>
  );
};

export default MenuDrawer;
