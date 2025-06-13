import { screen, render, fireEvent, waitFor } from "@testing-library/react";

import { Provider } from "react-redux";
import { store } from "../../store/store";
import { MemoryRouter } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

import Register from "./Register";

const mockRegister = jest.fn();
jest.mock("../../hooks/useAuth");
(useAuth as jest.Mock).mockReturnValue({
  handleRegister: mockRegister,
});

const mockEmail = "test@example.com";
const mockPassword = "password123";

describe("Register page", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );
  });

  test("shows an error message when user leaves the Email field empty", () => {
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByTestId("register-button"));

    expect(screen.getByText("Email is required.")).toBeInTheDocument();
  });

  test("shows an error message when user enters an invalid email", () => {
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@" },
    });
    fireEvent.click(screen.getByTestId("register-button"));

    expect(screen.getByText("Email is not valid.")).toBeInTheDocument();
  });

  test("shows an error message when user leaves the Password field empty", () => {
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: mockEmail },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByTestId("register-button"));

    expect(screen.getByText("Password is required.")).toBeInTheDocument();
  });

  test("shows an error message when user enters mismatched passwords in Password and Confirm fields", () => {
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: mockEmail },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "abc" },
    });
    fireEvent.change(screen.getByLabelText(/confirm/i), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByTestId("register-button"));

    expect(screen.getByText("Passwords do not match.")).toBeInTheDocument();
  });

  test("sends an API request on successful register", async () => {
    mockRegister.mockReturnValue({ message: "User created successfully" });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: mockEmail },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: mockPassword },
    });
    fireEvent.change(screen.getByLabelText(/confirm/i), {
      target: { value: mockPassword },
    });
    fireEvent.click(screen.getByTestId("register-button"));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        email: mockEmail,
        password: mockPassword,
      });
    });
  });
});
