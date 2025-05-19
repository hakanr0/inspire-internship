import Button from "../components/UI/Button";
import Input from "../components/UI/Input";

import { useState } from "react";
import { Link } from "react-router-dom";

// CUSTOM HOOKS
import { useAuth } from "../hooks/useAuth";

// ICONS
import HowToRegIcon from "@mui/icons-material/HowToReg";

export default function Register() {
  const { handleRegister } = useAuth();
  const [responseMessage, setResponseMessage] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const obj = Object.fromEntries(fd);

    if (obj["password"] !== obj["confirm-password"]) {
      setResponseMessage({
        type: "error",
        description: "Passwords do not match.",
      });
      return;
    }

    const result = await handleRegister({
      email: obj.email,
      password: obj.password,
    });
    console.log(result);
    setResponseMessage(result);
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
          valid={responseMessage?.type === "success"}
        />
        <div className="flex gap-2">
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="******"
            invalid={responseMessage?.type === "error"}
            valid={responseMessage?.type === "success"}
          />
          <Input
            id="confirm-password"
            label="Confirm"
            type="password"
            placeholder="******"
            invalid={responseMessage?.type === "error"}
            valid={responseMessage?.type === "success"}
          />
        </div>
        {responseMessage && (
          <p
            className={`font-semibold ${
              responseMessage?.type === "error"
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
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
