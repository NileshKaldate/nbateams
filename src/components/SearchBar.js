import React from "react";

const SearchBar = ({ setSearch }) => {
  return (
    <div>
      <h2 className="text-primary">NBA TEAMS</h2>
      <div
        className="mt-4 p-1 rounded"
        style={{ border: "1px solid #0275d8", width: "50%" }}
      >
        <input
          placeholder="Search By City"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
