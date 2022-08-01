import type { NextPage } from "next";
import { useState } from "react";
import { useCookies } from "react-cookie";
import useSWR, { SWRConfig } from "swr";

import SearchInput from "../components/SearchInput/SearchInput";
import SearchQuery from "../components/SearchQuery/SearchQuery";
import { searchesQuery } from "../graphql/queries/searches";
import { GQLClient } from "../utilities/GQLClient";

const getSearchResults = async (token: string, search: string) => {
  const gqlClient = new GQLClient(token);

  const searches = await gqlClient.client.request(searchesQuery, {
    query: search,
  });

  return searches;
};

const Home: NextPage = () => {
  const [cookies] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  const [search, setSearch] = useState("");

  const { data, mutate } = useSWR("searchKey", () =>
    getSearchResults(token, search)
  );

  console.info("data", data);

  const onSearch = (data) => {
    setSearch(data.search);
    mutate(() => getSearchResults(token, data.search));
  };

  return (
    <main className="container">
      <section className="searchHero">
        <div className="brand">
          <h1>RapidSearch</h1>
        </div>
        <div className="search">
          <SearchInput onSearch={onSearch} />
        </div>
      </section>
      <section className="searchResults">
        {data?.searchQueries.map((searchQuery, i) => {
          return <SearchQuery searchQuery={searchQuery} />;
        })}
      </section>
    </main>
  );
};

export default Home;
