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
        const recommendationDetails = await axios.get(
          `/api/movies/recommendation/${movieId}`
        );
        if (recommendationDetails.data) {
          // Ensure the data matches the Movie type
          setRecommendedList(recommendationDetails.data.data.results);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
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
      <h1>Recommendation</h1>
      <div className="flex w-full overflow-scroll">
        {recommendedList.map((eachMovie: Movie) => {
          const { original_title, poster_path } = eachMovie;

          return (
            <div
              key={eachMovie.id}
              onClick={() => handleMovieDetails(eachMovie.id)}
            >
              <Image
                src={`https://image.tmdb.org/t/p/original${poster_path}`}
                width={150}
                height={150}
                style={{ minWidth: "180px" }}
                className="shrink-0 mr-2 rounded-2xl"
                alt={original_title}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Recommendation;
