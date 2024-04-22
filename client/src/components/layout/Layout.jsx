import React from "react";
import { Header } from "./header/Header";
import { Listings } from "./listings/Listings";
import { Outlet } from "react-router-dom";
import { Footer } from "./footer/Footer";

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
