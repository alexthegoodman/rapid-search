import * as React from "react";

import { SearchQueryProps } from "./SearchQuery.d";

const SearchQuery: React.FC<SearchQueryProps> = ({ searchQuery }) => {
  return (
    <section className="searchQuery">
      <div className="searchQueryInner">
        <div className="searchQueryHeader">
          <span className="searchQueryHeadline">
            {searchQuery.normalText ? searchQuery.normalText : "No Query"}
          </span>
        </div>
        <div className="searchQueryLinks">
          <div className="searchQueryLinksInner">
            {searchQuery.links.map((link, x) => {
              return (
                <a href={link.url} target="_blank">
                  {link.title}
                </a>
              );
            })}
            {searchQuery.links.length === 0 ? "No Results" : ""}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchQuery;
