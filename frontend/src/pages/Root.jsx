import Button from "../components/UI/Button";
import SideNav from "../components/Layout/SideNav";
import MenuDrawer from "../components/Drawers/MenuDrawer";

import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { useDispatch } from "react-redux";

// ICONS
import MenuIcon from "@mui/icons-material/Menu";
import { userActions } from "../store/user";

export default function Root() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const toggleDrawer = (open) => {
    setOpenDrawer(open);
  };

  const isLoggedIn = async () => {
    const response = await fetch("http://localhost:8080/api/me", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const result = await response.json();
    if (response.ok) {
      dispatch(userActions.login(result.token));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    isLoggedIn();

    const handleResize = () => {
      if (window.innerWidth >= 768 && openDrawer === true) {
        setOpenDrawer(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [openDrawer]);

  return !isLoading ? (
    <>
      <MenuDrawer open={openDrawer} toggle={toggleDrawer} />
      <main className="flex flex-col gap-4 w-screen h-screen p-4">
        <header className="flex items-center gap-4 p-4 rounded-lg bg-[#0C6291] text-[#FBFEF9]">
          <Button
            btnAction="read"
            className="hidden max-md:block"
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </Button>
          <h1 className="fleur-de-leah text-5xl select-none max-md:text-[2.5rem]">
            Transactions
          </h1>
        </header>
        <section className="flex-1 flex gap-4 overflow-hidden">
          <SideNav />
          <div className="w-full p-4 rounded-lg shadow-inner overflow-auto">
            <Outlet />
          </div>
        </section>
      </main>
    </>
  ) : (
    <p>Loading...</p>
  );
}
