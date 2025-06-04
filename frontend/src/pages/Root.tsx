import Button from "../components/UI/Button";
import SideNav from "../components/Layout/SideNav/SideNav";
import MenuDrawer from "../components/Drawers/MenuDrawer";

import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { useAppDispatch } from "../store/hooks";
import { transactionsActions } from "../store/transactions";

import type { Category, Transaction } from "../types/transactionTypes";

// CUSTOM HOOKS
import { useAuth } from "../hooks/useAuth";

// ICONS
import MenuIcon from "@mui/icons-material/Menu";

const Root: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const toggleDrawer = (open: boolean) => {
    setOpenDrawer(open);
  };

  const fetchExpenses = async () => {
    const response = await fetch("http://localhost:8080/api/expenses");
    const result: Transaction[] = await response.json();
    dispatch(
      transactionsActions.setTransactions(
        [...result].sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )
      )
    );
  };

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:8080/api/categories");
    const result: Category[] = await response.json();
    dispatch(transactionsActions.setCategories(result));
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      isLoggedIn();
      fetchExpenses();
      fetchCategories();
    }

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
};

export default Root;
