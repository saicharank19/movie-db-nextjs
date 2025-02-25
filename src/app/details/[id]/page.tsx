"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Movie } from "@/types/request-body"; // Import the Movie type
import Image from "next/image";
import Recommendation from "@/components/ui/Recommendation";


function MovieDetails() {
  const params = useParams();
  const movieId = params.id;

  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<Movie | null>(null);

  useEffect(() => {
    const cachedData = localStorage.getItem(`movie-${movieId}`);
    if (cachedData) {
      setDetails(JSON.parse(cachedData));
      setLoading(false);
    } else {
      const getMovieDetails = async () => {
        try {
          setLoading(true);
          const movieDetails = await axios.get(
            `/api/movies/details/${movieId}`
          );
          if (movieDetails.data && movieDetails.data.data) {
            setDetails(movieDetails.data.data);
            localStorage.setItem(
              `movie-${movieId}`,
              JSON.stringify(movieDetails.data.data)
            );
          } else {
            console.error("No data received from the API");
          }
        } catch (error) {
          console.error("Error fetching movie details:", error.message);
        } finally {
          setLoading(false);
        }
      };

      getMovieDetails();
    }
  }, [movieId]);

  // Destructure details with a fallback for null
  const {
    title,
    id,
    original_title,
    poster_path,
    backdrop_path,
    overview,
    genres,
    release_date,
    tagline,
    runtime,
  } = details || {};

  function formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60); // Calculate the number of whole hours
    const remainingMinutes = minutes % 60; // Calculate the remaining minutes

    // Return the formatted string (e.g., "2h 30m")
    return `${hours}h ${remainingMinutes}m`;
  }

  return loading ? (
    <div>loading</div>
  ) : (
    <div>
      
      <div
        className="detail-bg"
        style={{
          width: "100%",
          height: "100vh",
          backgroundSize: "cover", // Ensures the image covers the entire div
          //backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.86) 0%, rgba(0, 0, 0, 0) 100%), url(https://image.tmdb.org/t/p/original${backdrop_path})`,
          backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat", // Prevents the image from repeating
        }}
      >
        <div className="flex p-4 place-items-center">
          <Image
            className="rounded-2xl"
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
            width={300}
            height={400}
            style={{ objectFit: "contain" }}
            alt={original_title || "Movie Poster"}
          />
          <div className="pl-6 place-self-start">
            <h1 className=" text-5xl font-extrabold mb-4">{title}</h1>
            <div className="flex justify-between w-[50%] mb-4">
              <p>{formatDuration(runtime)}</p>
              <p>{release_date}</p>
              {genres?.map((each) => {
                return <p key={each.id}>{each.name}</p>;
              })}
            </div>
            <p className="mb-4">{tagline}</p>
            <div>
              <h3 className="font-semibold">Overview</h3>
              <p className="w-[80%]">{overview}</p>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <div className="w-[90%] p-4">
        <Recommendation movieId={id} />
      </div>
    </div>
  );
}

export default MovieDetails;
