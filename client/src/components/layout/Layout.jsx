import React from "react";
import { Header } from "./Header/Header.jsx";
import { Listings } from "./Listings/Listings.jsx";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer/Footer.jsx";

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
