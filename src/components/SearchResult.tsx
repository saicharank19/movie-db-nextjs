import React from "react";
import { Movie } from "@/types/request-body";

function SearchResult({ result }) {
  return (
    <div>
      {result.map((eachResult: Movie, index) => {
        return (
          <div key={index} className="search-result-item p-1 text-white">
            <p>{eachResult.original_title}</p>
            <p>{eachResult.release_date}</p>
          </div>
        );
      })}
    </div>
  );
}

export default SearchResult;
