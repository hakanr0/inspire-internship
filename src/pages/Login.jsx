import Button from "../components/UI/Button";
import Input from "../components/UI/Input";

import { useState } from "react";
import { Link } from "react-router-dom";

// ICONS
import LoginIcon from "@mui/icons-material/Login";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-8 w-[32rem] m-auto p-4 rounded-lg shadow max-sm:w-full">
      <h1 className="fleur-de-leah text-[2.5rem] text-center select-none max-md:text-4xl">
        Login
      </h1>
      <form className="flex flex-col gap-4">
        <Input id="username" label="Username" placeholder="Your username..." />
        <Input
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="******"
        />
        <p className="flex items-center gap-2 text-sm">
          <Button btnAction="read" type="button" onClick={handleShowPassword}>
            {showPassword ? (
              <VisibilityOffIcon fontSize="small" />
            ) : (
              <VisibilityIcon fontSize="small" />
            )}
          </Button>
          {showPassword ? "Hide Password" : "Show Password"}
        </p>
        <Button btnAction="read">
          <LoginIcon fontSize="small" />
          Login
        </Button>
      </form>
      <p className="text-sm text-center max-sm:text-xs">
        Don't have an account?{" "}
        <Link to="/auth/register" className="font-semibold">
          Register
        </Link>
      </p>
    </div>
  );
}
