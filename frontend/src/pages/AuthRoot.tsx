import { useAppSelector } from "../store/hooks";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const AuthRoot: React.FC = () => {
  const token = useAppSelector((state) => state.user.token);

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
};

export default AuthRoot;
