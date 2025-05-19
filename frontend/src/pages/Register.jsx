import Button from "../components/UI/Button";
import Input from "../components/UI/Input";

import { Link } from "react-router-dom";

// ICONS
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useState } from "react";

export default function Register() {
  const [responseMessages, setResponseMessages] = useState([]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const obj = Object.fromEntries(fd);
    let errors = [];

    if (obj["password"] !== obj["confirm-password"]) {
      errors.push({
        type: "error",
        field: "confirm-password",
        description: "Passwords do not match.",
      });
    }

    if (errors.length !== 0) {
      setResponseMessages(errors);
      return;
    }

    const response = await fetch("http://localhost:8080/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: obj.email, password: obj.password }),
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <div className="flex flex-col gap-8 w-[32rem] m-auto p-4 rounded-lg shadow max-sm:w-full">
      <h1 className="fleur-de-leah text-[2.5rem] text-center select-none max-md:text-4xl">
        Register
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleRegister}>
        <Input id="email" label="Email" placeholder="johnwayne@example.com" />
        <div className="flex gap-2">
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="******"
          />
          <Input
            id="confirm-password"
            label="Confirm"
            type="password"
            placeholder="******"
            invalid={responseMessages?.some(
              (r) => r.field === "confirm-password" && r.type === "error"
            )}
          />
        </div>
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
