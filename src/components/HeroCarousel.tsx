import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Movie } from "@/types/request-body";

interface HeroCarouselProps {
  slides: Movie[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right"
  );
  useEffect(() => {
    let interval: any;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setSlideDirection("right");
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);
  // Guard against empty slides array
  if (!slides || slides.length === 0) {
    return null;
  }

  const goToSlide = (index: number) => {
    setSlideDirection(index > currentSlide ? "right" : "left");
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const previousSlide = () => {
    setSlideDirection("left");
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setSlideDirection("right");
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const getAdjacentSlides = () => {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    const nextIndex = (currentSlide + 1) % slides.length;
    return [slides[prevIndex], slides[nextIndex]];
  };

  // Default image to use if backdrop_path is missing
  const defaultImagePath = "/api/placeholder/1920/1080";

  return (
    <div
      className="relative hero-slider-box h-[600px]"
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background slides */}

      <div className="absolute inset-0 flex justify-between w-full z-10">
        {getAdjacentSlides().map((slide, index) => (
          <div
            key={slide?.id || index}
            className={`background-slider relative transition-transform duration-700 ease-in-out ${
              index === 0 ? "-translate-x-1/2" : "translate-x-1/2"
            }`}
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <Image
                src={
                  slide?.backdrop_path
                    ? `https://image.tmdb.org/t/p/original${slide.backdrop_path}`
                    : defaultImagePath
                }
                alt={slide?.original_title || "Movie poster"}
                layout="fill"
                objectFit="cover"
                className="opacity-50 scale-105 blur-[2px]"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Main slides */}
      <div className="relative overflow-hidden rounded-lg h-full">
        {slides.map((slide, index) => {
          const isCurrentSlide = index === currentSlide;
          const isPrevSlide =
            index === (currentSlide - 1 + slides.length) % slides.length;
          const isNextSlide = index === (currentSlide + 1) % slides.length;

          return (
            <div
              key={slide?.id || index}
              className={`absolute w-full h-full transform
                ${
                  isCurrentSlide
                    ? "z-20 translate-x-0 opacity-100"
                    : isPrevSlide && slideDirection === "left"
                    ? "z-10 -translate-x-full opacity-100"
                    : isNextSlide && slideDirection === "right"
                    ? "z-10 translate-x-full opacity-100"
                    : "z-0 translate-x-0 opacity-0"
                }`}
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={
                    slide?.backdrop_path
                      ? `https://image.tmdb.org/t/p/original${slide.backdrop_path}`
                      : defaultImagePath
                  }
                  alt={slide?.original_title || "Movie poster"}
                  layout="fill"
                  objectFit="cover"
                  priority={isCurrentSlide}
                />
                {/* Content overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="absolute bottom-5 left-0 p-8">
                    <h2 className="text-4xl font-bold text-white mb-2">
                      {slide?.original_title || "Untitled"}
                    </h2>
                    {slide?.overview && (
                      <p className="text-gray-200 max-w-xl line-clamp-2">
                        {slide.overview}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide indicators */}
      <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              currentSlide === index
                ? "bg-white"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-current={currentSlide === index}
            aria-label={`Slide ${index + 1}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={previousSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
          <ChevronLeft className="w-4 h-4 text-white" />
          <span className="sr-only">Previous</span>
        </span>
      </button>

      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
          <ChevronRight className="w-4 h-4 text-white" />
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default HeroCarousel;
