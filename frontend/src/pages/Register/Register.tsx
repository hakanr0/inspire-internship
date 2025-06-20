import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import type { ResponseMessage } from "../../types/messageTypes";

// CUSTOM HOOKS
import { useAuth } from "../../hooks/useAuth";

// ERROR HANDLER
import { handleRegisterErrors } from "../../util/errors";

// ICONS
import HowToRegIcon from "@mui/icons-material/HowToReg";

export default function Register() {
  const { handleRegister } = useAuth();
  const [responseMessage, setResponseMessage] = useState<ResponseMessage>();
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
          isValid={responseMessage?.type === "error" ? false : undefined}
        />
        <div className="flex gap-2">
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="******"
            isValid={responseMessage?.type === "error" ? false : undefined}
          />
          <Input
            id="confirm-password"
            label="Confirm"
            type="password"
            placeholder="******"
            isValid={responseMessage?.type === "error" ? false : undefined}
          />
        </div>
        {responseMessage &&
          (typeof responseMessage.description === "string" ? (
            <p className={"font-semibold text-red-600"}>
              {responseMessage.description}
            </p>
          ) : (
            <div className="flex flex-col">
              {responseMessage.description.map((d) => (
                <p key={d} className={"font-semibold text-red-600"}>
                  {d}
                </p>
              ))}
            </div>
          ))}
        <Button btnAction="read" data-testid="register-button">
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
