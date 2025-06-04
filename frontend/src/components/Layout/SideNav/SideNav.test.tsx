import { screen, render, fireEvent } from "@testing-library/react";

import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../../../store/user.ts";

import SideNav from "./SideNav.tsx";

const mockLoggedInStore = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: {
    user: {
      token: "token123",
    },
  },
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

  test("Create New Transaction button appears only for logged-in users", () => {
    expect(screen.getByText(/create new transaction/i)).toBeInTheDocument();
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
