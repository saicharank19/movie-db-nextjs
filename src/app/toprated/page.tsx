/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Movie } from "@/types/request-body";
import { useRouter } from "next/navigation";

function TopRated() {
  const [topRatedList, setTopRatedList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nextPage, setNextPage] = useState(1);
  const [prevPage, setPrevPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const getTopRatedMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=500a2293d6403e9c3caedb4591ae7624&page=${currentPage}`
        );
        if (response) {
          setTopRatedList(response.data.results);
          setCurrentPage(response.data.page);
          setTotalPages(response.data.total_pages);
          setNextPage(response.data.page + 1);
          setPrevPage(response.data.page - 1);
        } else {
          console.log(response);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    getTopRatedMovies();
  }, [currentPage]);

  const handleMovieDetails = useCallback(
    async (id: string) => {
      return router.push(`/details/${id}`);
    },
    [router]
  );

  return loading ? (
    <div className="loader"></div>
  ) : (
    <div>
      <h1 className="pl-2 text-2xl font-bold">Top Rated Movies</h1>
      <div className="flex flex-wrap w-full justify-center">
        {topRatedList.map((eachMovie: Movie, index: number) => {
          return (
            <div
              key={index}
              className="m-1 md:m-2 movieCard rounded-2xl overflow-hidden"
              onClick={() => handleMovieDetails(eachMovie.id)}
            >
              <img
                src={`https://image.tmdb.org/t/p/original${eachMovie.poster_path}`}
                className="w-[135px] md:w-[200px] rounded-2xl img-card aspect-[2/3]" // Aspect ratio 2:3 (width:height)
                alt={eachMovie.title}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => currentPage > 1 && setCurrentPage(prevPage)}
          className={
            currentPage > 1
              ? "text-[#6a11cb] underline mr-2"
              : "text-[rgb(156,163,175)] mr-2 cursor-not-allowed"
          }
        >
          Prev
        </button>

        {/* display 3 pages to the left of the current page */}
        {[...Array(Math.min(currentPage - 1, 3)).keys()].map((i) => {
          const newPage = currentPage - Math.min(currentPage - 1, 3) + i;

          return (
            <button
              key={i}
              onClick={() => {
                if (newPage > 0 && newPage <= totalPages) {
                  setCurrentPage(newPage);
                }
              }}
              className={
                newPage === currentPage
                  ? "bg-[#6a11cb] text-white px-2 py-1 rounded-md mr-2"
                  : "text-[#6a11cb] mr-2"
              }
              disabled={newPage < 1 || newPage > totalPages}
            >
              {newPage}
            </button>
          );
        })}
        {/* display 3 pages to the right of the current page */}
        {[...Array(3).keys()].map((i) => (
          <button
            key={i + 3}
            onClick={() => {
              /* calculate the new page number by adding the index of the
                 iteration to the current page number */
              const newPage = currentPage + i;
              if (newPage >= 1 && newPage <= totalPages) {
                /* if the new page number is valid, set the current page to it */
                setCurrentPage(newPage);
              }
            }}
            className={
              /* if the new page number is equal to the current page number,
                 and the current page number is greater than 0 and less than or
                 equal to the total number of pages, style the button as selected */
              currentPage + i === currentPage &&
              currentPage > 0 &&
              currentPage <= totalPages
                ? "bg-[#6a11cb] text-white px-2 py-1 rounded-md mr-2"
                : "text-[#6a11cb] mr-2"
            }
            disabled={
              /* disable the button if the new page number is less than 1 or
                 greater than the total number of pages */
              currentPage + i < 1 || currentPage + i > totalPages
            }
          >
            {/* display the page number */}
            {currentPage + i}
          </button>
        ))}
        <button
          onClick={() => currentPage < totalPages && setCurrentPage(nextPage)}
          className={
            currentPage < totalPages
              ? "text-[#6a11cb] underline"
              : "text-[rgb(156,163,175)] cursor-not-allowed"
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TopRated;
