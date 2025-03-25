import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Movie } from "@/types/request-body";

function Recommendation({ movieId }: { movieId: string | undefined }) {
  const [recommendedList, setRecommendedList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getRecommendations = async () => {
      try {
        // Check if recommendations are cached in localStorage
        const cachedData = localStorage.getItem(`recommendations-${movieId}`);
        if (cachedData) {
          // Use cached data if available
          setRecommendedList(JSON.parse(cachedData));
        } else {
          // Fetch recommendations from the API if not cached
          const recommendationDetails = await axios.get(
            `/api/movies/recommendation/${movieId}`
          );
          if (
            recommendationDetails.data &&
            recommendationDetails.data.data.results
          ) {
            // Update state with fetched data
            const results = recommendationDetails.data.data.results;
            setRecommendedList(results);

            // Cache the fetched data in localStorage
            localStorage.setItem(
              `recommendations-${movieId}`,
              JSON.stringify(results)
            );
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching recommendations:", error.message);
        }
      }
    };

    getRecommendations();
  }, [movieId]);

  const handleMovieDetails = useCallback(
    async (id: string) => {
      return router.push(`/details/${id}`);
    },
    [router]
  );

  return (
    <div>
      {recommendedList.length > 0 && (
        <h1 className="font-semibold mb-4">Recommendation</h1>
      )}
      <div className="flex w-full overflow-scroll">
        {recommendedList.map((eachMovie: Movie) => {
          const { original_title, poster_path } = eachMovie;

          return (
            <div
              key={eachMovie.id}
              onClick={() => handleMovieDetails(eachMovie.id)}
            >
              <div className=" rounded-2xl overflow-hidden">
                <Image
                  src={`https://image.tmdb.org/t/p/original${poster_path}`}
                  width={180}
                  height={180}
                  style={{ minWidth: "180px" }}
                  className="shrink-0 mr-2 rounded-2xl recommendationCard"
                  alt={original_title}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Recommendation;
