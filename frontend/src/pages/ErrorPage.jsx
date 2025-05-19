import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#0C6291] text-white">
      <h1 className="text-9xl font-extrabold">404</h1>
      <h3 className="text-sm text-gray-300">
        This page does not exist.{" "}
        <Link to="/" className="underline">
          Back to Home
        </Link>
      </h3>
    </div>
  );
}
