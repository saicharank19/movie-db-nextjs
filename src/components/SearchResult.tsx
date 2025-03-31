import React, { useCallback } from "react";
import { Movie } from "@/types/request-body";
import { useRouter } from "next/navigation";

interface SearchResultProps {
  result: Movie[]; // Replace `any` with the actual type of your search result data
  onClose: () => void; // Add this prop for closing the search results
}

function SearchResult({ result, onClose }: SearchResultProps) {
  const router = useRouter();
  const handleMovieDetails = useCallback(
    async (id: string) => {
      return router.push(`/details/${id}`);
    },
    [router]
  );
  return (
    <div className="searchResultContainer">
      {result.map((eachResult: Movie, index) => {
        return (
          <div
            onClick={() => {
              handleMovieDetails(eachResult.id);
              onClose();
            }}
            key={index}
            className="search-result-item p-1 text-white"
          >
            <p>{eachResult.title}</p>
            <p>{eachResult.release_date}</p>
          </div>
        );
      })}
    </div>
  );
}

export default SearchResult;
