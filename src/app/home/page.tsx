"use client";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import NavBar from "@/components/NavBar";
import { useRouter } from "next/navigation";
import HeroCarousel from "@/components/HeroCarousel";
import HeroSlideSkeleton from "@/components/skeleton/HeroSkeleton";
import CarouselSkeleton from "@/components/skeleton/CarouselSkeleton";
import CommonCarousel from "@/common-components/common-carousel";

import { useCookies } from "react-cookie";

function Home() {
  const [popularList, setPopularList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookie] = useCookies(["user_id"]);
  const router = useRouter();
  const API_KEY = "500a2293d6403e9c3caedb4591ae7624";
  const popular = "https://api.themoviedb.org/3/movie/popular";

  useEffect(() => {
    if (!cookie.user_id) {
      return router.push("/signup");
    }
    const getPopularMovies = async () => {
      try {
        const response = await axios.get(popular + `?api_key=${API_KEY}`);

        if (response) {
          setPopularList(response.data.results);
          setLoading(false);
        } else {
          console.log(response);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    };
    getPopularMovies();
  }, [API_KEY, cookie, router]);

  useEffect(() => {
    // Simulate a 3-second loading time
    const timer = setTimeout(() => {
      setLoading(false); // After 3 seconds, stop loading
    }, 3000); // 3000 ms = 3 seconds

    // Cleanup timer when component unmounts
    return () => clearTimeout(timer);
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

      {loading ? <HeroSlideSkeleton /> : <HeroCarousel slides={popularList} />}

      <button onClick={handleLogout}>Logout</button>
      <div className="p-20">
        {loading ? (
          <CarouselSkeleton />
        ) : (
          <CommonCarousel movieList={popularList} />
        )}
      </div>
    </div>
  );
}

export default Home;
