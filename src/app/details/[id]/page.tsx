/* eslint-disable @next/next/no-img-element */
"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Movie } from "@/types/request-body"; // Import the Movie type
import Recommendation from "@/components/ui/Recommendation";
import { CastMember, CrewMember } from "@/types/request-body";

function MovieDetails() {
  const params = useParams();
  const movieId = params.id;
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<Movie | null>(null);
  const [cast, setCast] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 640) {
      setIsSmallScreen(true);
    }
    const getMovieDetails = async () => {
      try {
        setLoading(true);

        const movieDetails = await axios.get(`/api/movies/details/${movieId}`);
        if (movieDetails.data.success) {
          setDetails(movieDetails.data.data);
          setDirectors(movieDetails.data.directors);
          setCast(movieDetails.data.cast);
        } else {
          console.error("No data received from the API");
        }
      } catch (error) {
        if (error instanceof Error)
          console.error("Error fetching movie details:", error.message);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId, isSmallScreen]);

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
    <div className="loader"></div>
  ) : (
    <div>
      <div
        className=" detail-bg"
        style={{
          backgroundSize: "cover",
          backgroundImage: `
      ${
        isSmallScreen
          ? `linear-gradient(to top, rgba(0, 0, 0, 0.86) 0%, rgba(0, 0, 0, 0) 100%), url(https://image.tmdb.org/t/p/original${backdrop_path})`
          : `linear-gradient(to right, rgba(0, 0, 0, 0.86) 0%, rgba(0, 0, 0, 0) 100%), url(https://image.tmdb.org/t/p/original${backdrop_path})`
      }`,
        }}
      >
        <div className="md:flex p-4 place-items-center">
          <img
            className="sm:rounded-2xl h-[300px] md:min-h-[400px] "
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
            // width={300}
            // height={400}
            style={{
              objectFit: "contain",
              borderRadius: `${isSmallScreen ? "16px" : ""}`,
            }}
            alt={original_title || "Movie Poster"}
          />
          <div className="md:pl-6 place-self-start overflow-hidden">
            <h1 className="mt-4 text-center md:text-5xl md:text-start font-extrabold mb-4">
              {title}
            </h1>
            <div
              style={{
                justifyContent: `${isSmallScreen ? "center" : "start"}`,
              }}
              className="flex mb-4 text-sm md:text-medium"
            >
              <p className="text-center mr-4">
                {runtime !== undefined ? formatDuration(runtime) : runtime}
              </p>
              <p className="text-center">{release_date}</p>
            </div>
            <div className="flex items-center mb-3 ">
              <h3 className="hidden md:block font-bold">Genre: </h3>
              <div
                className="flex w-full"
                style={{
                  justifyContent: `${isSmallScreen ? "center" : "start"}`,
                }}
              >
                {genres?.map((each) => {
                  return (
                    <button
                      className="md:ml-2 rounded-3xl text-xs p-2 bg-[#0000007b] mr-2"
                      key={each.id}
                    >
                      {each.name}
                    </button>
                  );
                })}
              </div>
            </div>
            <p className="italic text-sm mb-4">{tagline}</p>
            <div>
              <h3 className="hidden md:block font-semibold">Overview</h3>
              <p className="text-sm text-justify mb-4 md:w-[80%]">{overview}</p>

              {/*Directors */}
              <div className="mt-3">
                {directors.length > 0 && (
                  <h3 className="font-bold mb-2">Directors</h3>
                )}
                <div className="flex">
                  {directors.map((director: CrewMember) => {
                    return (
                      <div key={director.id}>
                        <button className="mr-2 rounded-xl p-2 bg-[#0000006a] hover:bg-[#6a11cb] ">
                          {director.name}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        {cast.length > 0 && <h5 className="font-bold ml-3">Top Billed Cast</h5>}
        <div className="p-3 flex overflow-auto no-scrollbar">
          {cast.map((actor: CastMember) => (
            <div
              key={actor.id}
              className="w-[140px] rounded-2xl bg-[#000000a4] text-center mr-3 shadow-lg hover:bg-[#6a11cb] hover:shadow-[#230c3d] "
            >
              {/* Conditional Rendering: Image or Skeleton */}
              {actor.profile_path ? (
                <img
                  className="min-w-[135px] rounded-2xl mb-4"
                  alt={actor.name}
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                />
              ) : (
                <div className="w-[140px] h-[190px] bg-gray-700 rounded-2xl mb-4 flex items-center justify-center">
                  <svg
                    className="w-[50px] h-[50px] text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
              )}

              {/* Actor Details */}
              <div className="pb-3">
                <p className="inline-block align-baseline font-semibold text-xs mb-2">
                  {actor.name}
                </p>
                <p className="inline-block align-baseline text-xs">
                  {actor.character}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="md:w-[100%] p-4">
        <Recommendation movieId={id} />
      </div>
    </div>
  );
}

export default MovieDetails;
