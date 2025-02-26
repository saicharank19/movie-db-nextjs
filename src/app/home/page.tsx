"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import HeroCarousel from "@/components/HeroCarousel";
import HeroSlideSkeleton from "@/components/skeleton/HeroSkeleton";
import CarouselSkeleton from "@/components/skeleton/CarouselSkeleton";
import CommonCarousel from "@/common-components/common-carousel";

import { useCookies } from "react-cookie";

function Home() {
  const [popularList, setPopularList] = useState([]);
  const [upcomingList, setUpcomingList] = useState([]);
  const [topRatedList, setTopRatedList] = useState([]);
  //const [todayTrendingList, setTodayTrendingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookie] = useCookies(["user_id"]);
  const router = useRouter();
  const API_KEY = "500a2293d6403e9c3caedb4591ae7624";
  const popular = "https://api.themoviedb.org/3/movie/popular";
  const upcoming = "https://api.themoviedb.org/3/movie/upcoming";
  const topRated = "https://api.themoviedb.org/3/movie/top_rated";
  //const todayTrending = "https://api.themoviedb.org/3/trending/movie/day";

  useEffect(() => {
    if (!cookie.user_id) {
      return router.push("/signup");
    }
    const getPopularMovies = async () => {
      try {
        const response1 = await axios.get(popular + `?api_key=${API_KEY}`);
        const response2 = await axios.get(upcoming + `?api_key=${API_KEY}`);
        const response3 = await axios.get(topRated + `?api_key=${API_KEY}`);

        if (response1) {
          setPopularList(response1.data.results);
          setUpcomingList(response2.data.results);
          setTopRatedList(response3.data.results);
          //setTodayTrendingList(response4.data.results);
          setLoading(false);
        } else {
          console.log(response1);
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

  return (
    <div>
      <section className="h-[300px] md:h-full">
        {loading ? (
          <HeroSlideSkeleton />
        ) : (
          <HeroCarousel slides={popularList} />
        )}
      </section>

      <div className="mt-8 mb-8 md:pr-20 md:pl-20">
        {loading ? (
          <CarouselSkeleton />
        ) : (
          <CommonCarousel movieList={popularList} title={"Popular Movies"} />
        )}
      </div>
      <div className="mt-8 mb-8 md:pr-20 md:pl-20">
        {loading ? (
          <CarouselSkeleton />
        ) : (
          <CommonCarousel movieList={upcomingList} title={"Upcoming Movies"} />
        )}
      </div>
      <div className="mt-8 mb-8 md:pr-20 md:pl-20">
        {loading ? (
          <CarouselSkeleton />
        ) : (
          <CommonCarousel movieList={topRatedList} title={"Top Rated Movies"} />
        )}
      </div>
    </div>
  );
}

export default Home;
