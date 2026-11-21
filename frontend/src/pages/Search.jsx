import { Navigate, useLocation } from "react-router-dom";

const Search = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("query")?.trim();

  if (!query) return <Navigate to="/vendor-categories" replace />;

  const searchParams = new URLSearchParams({ search: query });
  return (
    <Navigate
      to={`/vendor-categories/all/all?${searchParams.toString()}`}
      replace
    />
  );
};

export default Search;
