import React from "react";
import { render, screen /*fireEvent*/ } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { Header } from "./Header";
//import { useLogout } from "../../../hooks/useLogout";

jest.mock("../../../hooks/useLogout", () => ({
  useLogout: () => ({
    logoutHandler: jest.fn(),
  }),
}));

describe("Header component", () => {
  it("renders welcome message and login button when user is not logged in", () => {
    render(
      <AuthContext.Provider value={{ authUser: null }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    expect(
      screen.getByText(/Welcome! Find Your Perfect Match Here.../i),
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("renders welcome message, username, and logout button when user is logged in", () => {
    const authUser = { username: "TestUser" };

    render(
      <AuthContext.Provider value={{ authUser }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    expect(
      screen.getByText(
        `Welcome back ${authUser.username}! Find Your Perfect Match Here...`,
      ),
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  /*it("calls logoutHandler when logout button is clicked", () => {
    const mockLogoutHandler = jest.fn();
    useLogout.mockReturnValue({ logoutHandler: mockLogoutHandler });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: /logout/i }));

    expect(mockLogoutHandler).toHaveBeenCalled();
  });*/
});
