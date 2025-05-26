import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AuthRoot() {
  const token = useSelector((state) => state.user.token);

  return token ? (
    <p className="text-center font-semibold text-gray-400">
      You are already logged in.
    </p>
  ) : (
    <>
      <ToastContainer />
      <Outlet />
    </>
  );
}
