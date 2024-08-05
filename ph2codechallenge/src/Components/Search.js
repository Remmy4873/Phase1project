import React, { useState } from "react";

function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="form-inline my-3">
      <div className="form-group">
        <label htmlFor="searchTerm">Search Transactions:</label>
        <input
          type="text"
          className="form-control ml-2"
          id="searchTerm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-secondary ml-2">
        Search
      </button>
    </form>
  );
}

export default Search;