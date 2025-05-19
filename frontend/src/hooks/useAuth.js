import { useDispatch } from "react-redux";
import { userActions } from "../store/user";

import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (creds) => {
    const response = await fetch("http://localhost:8080/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(creds),
    });
    const result = await response.json();
    if (!response.ok) {
      return {
        type: "error",
        description: result.message,
      };
    } else {
      return { type: "success", description: "User created successfully" };
    }
  };

  const handleLogin = async (creds) => {
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(creds),
    });
    const result = await response.json();
    if (!response.ok) {
      return result;
    } else {
      dispatch(userActions.login(result.token));
      navigate("/");
      return;
    }
  };

  const handleLogout = async () => {
    const response = await fetch("http://localhost:8080/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      dispatch(userActions.logout());
      navigate("/");
    }
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
  };

  return { handleRegister, handleLogin, handleLogout, isLoggedIn };
};
