import React, { useCallback } from "react";
import { Movie } from "@/types/request-body";
import { useRouter } from "next/navigation";
import Image from "next/image";
interface SearchResultProps {
  result: Movie[]; // Replace `any` with the actual type of your search result data
  textOnly: boolean;
  onClose: () => void; // Add this prop for closing the search results
}

function SearchResult({ result, textOnly, onClose }: SearchResultProps) {
  const router = useRouter();
  const handleMovieDetails = useCallback(
    async (id: string) => {
      return router.push(`/details/${id}`);
    },
    [router]
  );
  return textOnly ? (
    <div>
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
  ) : (
    <div>
      {result.map((eachResult: Movie, index) => {
        const imgPath =
          "https://image.tmdb.org/t/p/original" + eachResult.poster_path;
        return (
          <div
            onClick={() => handleMovieDetails(eachResult.id)}
            key={index}
            // className="search-result-item p-1 text-white"
          >
            <Image
              width={180}
              height={220}
              src={imgPath}
              className="rounded-2xl"
              alt=""
              blurDataURL="data:..."
              placeholder="blur"
            />
          </div>
        );
      })}
    </div>
  );
}

export default SearchResult;
