import Button from "../components/UI/Button";
import Input from "../components/UI/Input";

import { Link } from "react-router-dom";

// ICONS
import HowToRegIcon from "@mui/icons-material/HowToReg";

export default function Register() {
  return (
    <div className="flex flex-col gap-8 w-[32rem] m-auto p-4 rounded-lg shadow max-sm:w-full">
      <h1 className="fleur-de-leah text-[2.5rem] text-center select-none max-md:text-4xl">
        Register
      </h1>
      <form className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Input id="name" label="Name" placeholder="John" />
          <Input id="surname" label="Surname" placeholder="Wayne" />
        </div>
        <Input id="username" label="Username" placeholder="johnw" />
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
