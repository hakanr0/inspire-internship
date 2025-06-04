import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";

import { useState } from "react";
import { Link } from "react-router-dom";

// CUSTOM HOOKS
import { useAuth } from "../../hooks/useAuth";

// HANDLE ERRORS
import { handleLoginErrors } from "../../util/errors";

// ICONS
import LoginIcon from "@mui/icons-material/Login";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login: React.FC = () => {
  const { handleLogin } = useAuth();
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const obj = Object.fromEntries(fd);

    const loginError = handleLoginErrors({
      email: obj.email as string,
      password: obj.password as string,
    });
    if (loginError) {
      setError(loginError);
      return;
    }

    const result = await handleLogin({
      email: obj.email as string,
      password: obj.password as string,
    });
    if (result) {
      setError(result.message);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-[32rem] m-auto p-4 rounded-lg shadow max-sm:w-full">
      <h1 className="fleur-de-leah text-[2.5rem] text-center select-none max-md:text-4xl">
        Login
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          id="email"
          label="Email"
          placeholder="Your email..."
          isValid={error !== "" ? Boolean(!error) : undefined}
        />
        <Input
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="******"
          isValid={error !== "" ? Boolean(!error) : undefined}
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
        {error && <p className="font-semibold text-red-600">{error}</p>}
        <Button btnAction="read" data-testid="login-button">
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
};

export default Login;
