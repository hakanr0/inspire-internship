import {
  screen,
  render,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";

import { Provider } from "react-redux";
import { store } from "../../store/store";
import { MemoryRouter } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

import Login from "./Login";

const mockLogin = jest.fn();
jest.mock("../../hooks/useAuth");
(useAuth as jest.Mock).mockReturnValue({
  handleLogin: mockLogin,
});

const mockEmail = "test@example.com";
const mockPassword = "password123";
const mockToken = "token123";

describe("Login page", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
  });

  test("shows an error message when user leaves the Email field empty", () => {
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByTestId("login-button"));

    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });

  test("shows an error message when user enters an invalid email", () => {
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@" },
    });
    fireEvent.click(screen.getByTestId("login-button"));

    expect(screen.getByText("Email is not valid")).toBeInTheDocument();
  });

  test("shows an error message when user leaves the Password field empty", () => {
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: mockEmail },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByTestId("login-button"));

    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });

  test("sends an API request on successful login", async () => {
    mockLogin.mockReturnValue({ token: mockToken });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: mockEmail },
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: mockPassword },
      });
      fireEvent.click(screen.getByTestId("login-button"));
    });

    const result = await mockLogin.mock.results[0].value;

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: mockEmail,
        password: mockPassword,
      });
      expect(result).toEqual({ token: mockToken });
    });
  });
});
