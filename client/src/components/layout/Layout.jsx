import React from "react";
import { Header } from "./header/Header.jsx";
import { Listings } from "./listings/Listings.jsx";
import { Outlet } from "react-router-dom";
import { Footer } from "./footer/Footer.jsx";

export const Layout = () => {
  return (
    <div className="App">
      <Header />
      <Listings />
      <Outlet />
      <Footer />
    </div>
  );
};
