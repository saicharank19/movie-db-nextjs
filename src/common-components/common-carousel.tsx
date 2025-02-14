import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import React from "react";
import Image from "next/image";
import { Movie } from "@/types/request-body";

function CommonCarousel({
  movieList,
  title,
}: {
  movieList: Movie[];
  title: string;
}) {
  return (
    <div>
      <h3>{title}</h3>
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
                <CarouselItem key={id} className="basis-1/7">
                  <div className="p-1">
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
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default CommonCarousel;
