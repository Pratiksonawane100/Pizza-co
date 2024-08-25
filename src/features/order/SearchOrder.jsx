import { useState, useNavigate } from "react";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handlSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handlSubmit}>
      <input
        placeholder="Search order"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
export default SearchOrder;
