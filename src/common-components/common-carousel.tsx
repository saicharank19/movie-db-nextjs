import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import React, { useCallback } from "react";
import Image from "next/image";
import { Movie } from "@/types/request-body";
import { useRouter } from "next/navigation";

function CommonCarousel({
  movieList,
  title,
}: {
  movieList: Movie[];
  title: string;
}) {
  const router = useRouter();
  const handleMovieDetails = useCallback(
    async (id: string) => {
      return router.push(`/details/${id}`);
    },
    [router]
  );
  return (
    <div>
      <h3 className="p-2 md:pl-2 font-[650]">{title}</h3>
      <Carousel
        opts={{
          align: "start",
        }}
      >
        <CarouselContent className="-ml-4">
          {movieList.length > 0 &&
            movieList.map((movie: Movie, id) => {
              const imgPath =
                "https://image.tmdb.org/t/p/original" + movie.poster_path;
              return (
                <CarouselItem
                  key={id}
                  className="basis-1/7"
                  onClick={() => handleMovieDetails(movie.id)}
                >
                  <div className="movieCard">
                    <span>
                      <Image
                        width={180}
                        height={220}
                        src={imgPath}
                        className="rounded-2xl"
                        alt=""
                        blurDataURL="data:..."
                        placeholder="blur"
                      />
                    </span>
                  </div>
                </CarouselItem>
              );
            })}
        </CarouselContent>
        {window.innerWidth > 640 && <CarouselPrevious />}
        {window.innerWidth > 640 && <CarouselNext />}
      </Carousel>
    </div>
  );
}

export default CommonCarousel;
