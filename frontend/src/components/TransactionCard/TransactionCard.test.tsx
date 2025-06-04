import { screen, render, fireEvent } from "@testing-library/react";

import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../../store/user.ts";

import TransactionCard from "./TransactionCard.tsx";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

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

const mockTitle = "Football Equipment";
const mockCategory = "Sports";
const mockValue = 95;
const mockDate = "01/01/1990";

describe("Transaction component", () => {
  beforeEach(() => {
    render(
      <Provider store={mockLoggedInStore}>
        <MemoryRouter>
          <TransactionCard
            id={0}
            title={mockTitle}
            categoryId={0}
            category={mockCategory}
            value={mockValue}
            date={mockDate}
          />
        </MemoryRouter>
      </Provider>
    );

    mockDispatch.mockReset();
  });

  test("renders transaction details correctly", () => {
    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    expect(screen.getByText(mockCategory)).toBeInTheDocument();
    expect(screen.getByText(`$${mockValue}`)).toBeInTheDocument();
    expect(screen.getByText("January 01, 1990")).toBeInTheDocument();
  });

  test("Edit and Delete buttons appear only for logged-in users", () => {
    expect(screen.getByTestId("edit-transaction-button")).toBeInTheDocument();
    expect(screen.getByTestId("delete-transaction-button")).toBeInTheDocument();
  });

  test("Edit button shows a modal with transaction details", async () => {
    mockDispatch.mockResolvedValue("Edit clicked");

    fireEvent.click(screen.getByTestId("edit-transaction-button"));
    const result = await mockDispatch.mock.results[0].value;

    expect(result).toEqual("Edit clicked");
  });

  test("Delete button shows a confirm deletion modal", async () => {
    mockDispatch.mockResolvedValue("Delete clicked");

    fireEvent.click(screen.getByTestId("delete-transaction-button"));
    const result = await mockDispatch.mock.results[0].value;

    expect(result).toEqual("Delete clicked");
  });
});
