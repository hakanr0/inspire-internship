import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./pages/Root";
import Home from "./pages/Home";
import NewTransaction from "./pages/NewTransaction";

// AUTH
import AuthRoot from "./pages/AuthRoot";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "new",
          element: <NewTransaction />,
        },
        {
          path: "auth",
          element: <AuthRoot />,
          children: [
            {
              index: true,
              element: <Login />,
            },
            {
              path: "register",
              element: <Register />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
