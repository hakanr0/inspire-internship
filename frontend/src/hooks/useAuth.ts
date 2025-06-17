import { useAppDispatch } from "../store/hooks";
import { userActions } from "../store/user";

import { useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

import type { Credentials } from "../types/userTypes";

type RegisterResponseMessage = {
  code: string;
  description: string;
};

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegister = async (creds: Credentials) => {
    const response = await fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(creds),
    });
    const result = await response.json();
    if (!response.ok) {
      const errors = (result as RegisterResponseMessage[]).map(
        (r) => r.description
      );
      return {
        type: "error",
        description: errors,
      };
    } else {
      return { type: "success", description: "User created successfully" };
    }
  };

  const handleLogin = async (creds: Credentials) => {
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(creds),
    });
    const result = await response.json();
    if (!response.ok) {
      return result;
    } else {
      localStorage.setItem("token", result.token);
      dispatch(userActions.login(result.token));
      navigate("/");
      return;
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    dispatch(userActions.logout());
    navigate("/");
  };

  const isLoggedIn = async (token: string) => {
    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      const expired = Math.floor(Date.now() / 1000) > exp;

      if (expired) {
        localStorage.removeItem("token");
      } else {
        dispatch(userActions.login(token));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { handleRegister, handleLogin, handleLogout, isLoggedIn };
};
