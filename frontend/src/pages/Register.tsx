import Button from "../components/UI/Button";
import Input from "../components/UI/Input";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

// CUSTOM HOOKS
import { useAuth } from "../hooks/useAuth";

// ERROR HANDLER
import { handleRegisterErrors } from "../util/errors";

// ICONS
import HowToRegIcon from "@mui/icons-material/HowToReg";

export default function Register() {
  const { handleRegister } = useAuth();
  const [responseMessage, setResponseMessage] = useState<{
    type: string;
    description: string;
  }>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const obj = Object.fromEntries(fd);

    const registerError = handleRegisterErrors({
      email: obj.email as string,
      password: obj.password as string,
      "confirm-password": obj["confirm-password"] as string,
    });
    if (registerError) {
      setResponseMessage(registerError);
      return;
    }

    const result = await handleRegister({
      email: obj.email as string,
      password: obj.password as string,
    });
    if (result.type === "success") {
      toast.success(result.description);
      navigate("/auth");
      // return;
    } else {
      setResponseMessage(result);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-[32rem] m-auto p-4 rounded-lg shadow max-sm:w-full">
      <h1 className="fleur-de-leah text-[2.5rem] text-center select-none max-md:text-4xl">
        Register
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          id="email"
          label="Email"
          placeholder="johnwayne@example.com"
          invalid={responseMessage?.type === "error"}
        />
        <div className="flex gap-2">
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="******"
            invalid={responseMessage?.type === "error"}
          />
          <Input
            id="confirm-password"
            label="Confirm"
            type="password"
            placeholder="******"
            invalid={responseMessage?.type === "error"}
          />
        </div>
        {responseMessage && (
          <p className={"font-semibold text-red-600"}>
            {responseMessage.description}
          </p>
        )}
        <Button btnAction="read">
          <HowToRegIcon fontSize="small" />
          Register
        </Button>
      </form>
      <p className="text-sm text-center max-sm:text-xs">
        Already have an account?{" "}
        <Link to="/auth" className="font-semibold">
          Login
        </Link>
      </p>
    </div>
  );
}
