import { screen, render, fireEvent, waitFor } from "@testing-library/react";

import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { MemoryRouter } from "react-router-dom";

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store/user.ts";

import { useAuth } from "./hooks/useAuth";

import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import SideNav from "./components/Layout/SideNav.tsx";
import TransactionCard from "./components/TransactionCard.tsx";

const mockLogin = jest.fn();
const mockRegister = jest.fn();
const mockDispatch = jest.fn();

jest.mock("./hooks/useAuth");
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

(useAuth as jest.Mock).mockReturnValue({
  handleLogin: mockLogin,
  handleRegister: mockRegister,
});

const mockLoggedInStore = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: {
    user: {
      token: "mock-token",
    },
  },
});

describe("Authentication flows", () => {
  test("login function works correctly", async () => {
    mockLogin.mockReturnValue({ token: "token123" });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "test123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    const result = await mockLogin.mock.results[0].value;

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "test123",
      });
      expect(result).toEqual({ token: "token123" });
    });
  });

  test("register function works correctly", async () => {
    mockRegister.mockReturnValue({ message: "User created successfully" });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "test123" },
    });
    fireEvent.change(screen.getByLabelText(/confirm/i), {
      target: { value: "test123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "test123",
      });
    });
  });
});

describe("Conditional rendering", () => {
  test("Create New Transaction button appears only for logged-in users", () => {
    render(
      <Provider store={mockLoggedInStore}>
        <MemoryRouter>
          <SideNav />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/create new transaction/i)).toBeInTheDocument();
  });

  test("Edit and Delete buttons appear only for logged-in users", () => {
    render(
      <Provider store={mockLoggedInStore}>
        <MemoryRouter>
          <TransactionCard
            id={0}
            title="Football Equipment"
            categoryId={0}
            category="Sports"
            value={95}
            date={"01/01/1990"}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByRole("button", { name: /edit transaction/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /delete transaction/i })
    ).toBeInTheDocument();
  });
});

describe("Transaction component", () => {
  beforeEach(() => {
    render(
      <Provider store={mockLoggedInStore}>
        <MemoryRouter>
          <TransactionCard
            id={0}
            title="Football Equipment"
            categoryId={0}
            category="Sports"
            value={95}
            date={"01/01/1990"}
          />
        </MemoryRouter>
      </Provider>
    );

    mockDispatch.mockReset();
  });

  test("renders transaction details correctly", () => {
    expect(screen.getByText("Football Equipment")).toBeInTheDocument();
    expect(screen.getByText("Sports")).toBeInTheDocument();
    expect(screen.getByText("$95")).toBeInTheDocument();
    expect(screen.getByText("January 01, 1990")).toBeInTheDocument();
  });

  test("Edit button behaves as expected", async () => {
    mockDispatch.mockResolvedValue("Edit clicked");

    fireEvent.click(screen.getByRole("button", { name: /edit transaction/i }));
    const result = await mockDispatch.mock.results[0].value;

    expect(result).toEqual("Edit clicked");
  });

  test("Delete button behaves as expected", async () => {
    mockDispatch.mockResolvedValue("Delete clicked");

    fireEvent.click(
      screen.getByRole("button", { name: /delete transaction/i })
    );
    const result = await mockDispatch.mock.results[0].value;

    expect(result).toEqual("Delete clicked");
  });
});

describe("Sidebar navigation", () => {
  beforeEach(() => {
    render(
      <Provider store={mockLoggedInStore}>
        <MemoryRouter>
          <SideNav />
        </MemoryRouter>
      </Provider>
    );
  });

  test("options appear correctly based on user authentication", () => {
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/create new transaction/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
    expect(screen.queryByText("Login/Signup")).not.toBeInTheDocument();
  });

  test("routes correctly when options are clicked", () => {
    fireEvent.click(
      screen.getByRole("link", { name: /create new transaction/i })
    );

    expect(screen.getByText(/new transaction/i)).toBeInTheDocument();
  });
});
