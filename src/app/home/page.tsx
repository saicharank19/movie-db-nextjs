"use client";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { Movie } from "@/types/request-body";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/navigation";
import HeroCarousel from "@/components/HeroCarousel";

function Home() {
  const [popularList, setPopularList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const response = await axios.get("/api/movies/popular");
        if (response.data.success) {
          setPopularList(response.data.data.results);
        } else {
          console.log(response.data);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    };
    getPopularMovies();
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      const response = await axios.post("/api/user/logout");
      console.log(response.data.success);
      if (response.data.success) {
        toast.success(response.data.message);
        router.push("/signin");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }, [router]);

  return (
    <div>
      <NavBar />
      <HeroCarousel slides={popularList} />
      <button onClick={handleLogout}>Logout</button>
      <div>
        {popularList.length > 0 &&
          popularList.map((movie: Movie, id) => {
            const imgPath =
              "https://image.tmdb.org/t/p/original" + movie.poster_path;
            return (
              <div key={id}>
                <Image
                  width={150}
                  height={150}
                  src={imgPath}
                  alt=""
                  blurDataURL="data:..."
                  placeholder="blur"
                />
                <p>{movie.original_title}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
