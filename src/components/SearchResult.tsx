import React, { useCallback } from "react";
import { Movie } from "@/types/request-body";
import { useRouter } from "next/navigation";

function SearchResult({ result }: { result: Movie[] }) {
  const router = useRouter();
  const handleMovieDetails = useCallback(
    async (id: string) => {
      return router.push(`/details/${id}`);
    },
    [router]
  );
  return (
    <div>
      {result.map((eachResult: Movie, index) => {
        return (
          <div
            onClick={() => handleMovieDetails(eachResult.id)}
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
