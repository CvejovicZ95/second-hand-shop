import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Search.css";

export const Search = ({ handleSearch }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    handleSearch(value);
  };

  return (
    <form className="search-form">
      <input
        className="search-input"
        type="search"
        placeholder="Search items by name..."
        value={search}
        onChange={handleChange}
      />
      <button className="search-button">
        <FaSearch className="fa-search" />
      </button>
    </form>
  );
};