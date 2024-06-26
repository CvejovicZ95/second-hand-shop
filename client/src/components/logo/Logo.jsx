import React from "react";
import { Link } from "react-router-dom";
import { scrollToTop } from "../../hooks/useScrollTop";

export const Logo = () => {
  return (
    <Link to="/">
      <img
        src="second-hand.png"
        onClick={scrollToTop}
        alt="logo"
        width="150px"
      />
    </Link>
  );
};
