/* eslint-disable @next/next/no-img-element */
"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Movie, PersonDetails } from "@/types/request-body";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

function Person() {
  const params = useParams();
  const personId = params.id;
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<PersonDetails | null>(null);
  const [directed, setDirected] = useState([]);
  const [actedMovies, setActedMovies] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getPersonDetails = async () => {
      try {
        setLoading(true);
        const [personDetails, personDirectedMovies] = await Promise.all([
          axios.get(`/api/movies/person-details/${personId}`),
          axios.get(`/api/movies/person-movies/${personId}`),
        ]);

        if (personDetails.data.success) {
          setDetails(personDetails.data.data);
        }
        if (personDirectedMovies.data.success) {
          setDirected(personDirectedMovies.data.data.directedMovies);
        }
        if (personDirectedMovies.data.success) {
          setActedMovies(personDirectedMovies.data.data.actedMovies);
        } else {
          console.error("No data received from the API");
        }
      } catch (error) {
        if (error instanceof Error)
          console.error("Error fetching person details:", error.message);
      } finally {
        setLoading(false);
      }
    };

    getPersonDetails();
  }, [personId]);

  return loading ? (
    <div className="loader"></div>
  ) : (
    <div className="flex justify-around">
      <div className="mr-2 mb-4 ">
        <img
          className="m-auto mb-3 sm:rounded-2xl h-[300px] md:min-h-[400px] "
          src={`https://image.tmdb.org/t/p/original${details?.profile_path}`}
          alt=""
        />
        <h1 className="text-center text-3xl font-bold mb-4">{details?.name}</h1>
      </div>
      <div className="w-2/3">
        <h2 className="text-2xl font-bold mb-4">Biography</h2>
        <p className="mb-4 text-justify">{details?.biography}</p>
        <p className="mb-4">Birthday: {details?.birthday}</p>
        {details?.deathday && <p>Deathday: {details?.deathday}</p>}
        <p className="mb-4">Place of Birth: {details?.place_of_birth}</p>
        <p className="mb-4">
          Known For Department: {details?.known_for_department}
        </p>
        <div>
          {directed.length > 0 && (
            <h2 className="text-2xl font-bold mb-4">Directed Movies</h2>
          )}
          <div className="flex w-[100%] overflow-x-scroll gap-4 no-scrollbar mb-4">
            <div
              style={{
                display: directed.length > 0 ? "block" : "none",
              }}
            />
            {directed.map((movie: Movie) => (
              <div key={movie.id}>
                <div
                  className={cn(
                    "cursor-pointer h-[15rem] min-w-[10rem] rounded-2xl overflow-hidden shadow-md",
                    {
                      hidden: !movie.poster_path || movie.poster_path === null,
                    }
                  )}
                  onClick={() => router.push(`/details/${movie.id}`)}
                >
                  <img
                    className="h-full w-full img-card rounded-2xl"
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={`${movie.title}`}
                  />
                </div>
                <p
                  className={cn("text-center", {
                    hidden: !movie.poster_path || movie.poster_path === null,
                  })}
                >
                  {movie.title}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          {actedMovies.length > 0 && (
            <h2 className="text-2xl font-bold mb-4">Acted Movies</h2>
          )}
          <div className="flex w-[100%] overflow-x-scroll gap-4 no-scrollbar mb-4">
            {actedMovies.map((movie: Movie) => (
              <div key={movie.id}>
                <div
                  className={cn(
                    "cursor-pointer h-[15rem] min-w-[10rem] rounded-2xl overflow-hidden shadow-md",
                    {
                      hidden: movie.poster_path === null,
                    }
                  )}
                  onClick={() => router.push(`/details/${movie.id}`)}
                >
                  <img
                    className="h-full w-full img-card rounded-2xl"
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={`${movie.title}`}
                  />
                </div>
                <p
                  className={cn("text-center", {
                    hidden: !movie.poster_path || movie.poster_path === null,
                  })}
                >
                  {movie.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Person;
