import type React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Movie } from "@/types/request-body";
import { useRouter } from "next/navigation";

const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
  event.currentTarget.style.opacity = "1";
};

interface HeroCarouselProps {
  slides: Movie[];
}

const getAdjacentSlides = (current: number, slides: Movie[]) => {
  const prevIndex = (current - 1 + slides.length) % slides.length;
  const nextIndex = (current + 1) % slides.length;
  return [slides[prevIndex], slides[current], slides[nextIndex]];
};

const HeroCarousel: React.FC<HeroCarouselProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [, setSlideDirection] = useState<"left" | "right">("right");
  const slideRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const startAutoPlay = () => {
      timeoutId = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setSlideDirection("right");
      }, 3000);
    };

    if (isAutoPlaying) {
      startAutoPlay();
    }

    return () => {
      clearTimeout(timeoutId); // Clear the timeout when the component unmounts or dependencies change
    };
  }, [isAutoPlaying, currentSlide, slides.length]); // Add `currentSlide` to the dependency array

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setSlideDirection("left");
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setSlideDirection("right");
  };

  const handleMovieDetails = useCallback(
    async (id: string) => {
      try {
        return router.push(`/details/${id}`);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
        }
      }
    },
    [router]
  );

  const defaultImagePath = "/images/default-movie-poster.jpg";
  const adjacentSlides = getAdjacentSlides(currentSlide, slides);

  return (
    <div
      className="relative hero-slider-box h-[70vmin] w-[70vmin]  mx-auto"
      ref={slideRef}
    >
      {/* Background slides */}
      <div className="absolute inset-0 flex justify-between w-full">
        {adjacentSlides.map((slide, index) => (
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
                className="opacity-50 scale-105 blur-[2px] rounded-3xl"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Main slides */}
      <div className="relative  overflow-hidden rounded-lg h-full [perspective:1200px] [transform-style:preserve-3d]">
        {slides.map((slide, index) => {
          const isCurrentSlide = index === currentSlide;
          const isPrevSlide =
            index === (currentSlide - 1 + slides.length) % slides.length;
          const isNextSlide = index === (currentSlide + 1) % slides.length;

          return (
            <div
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              key={slide?.id || index}
              className={`absolute w-full h-full transform transition-all duration-300 ease-in-out
              ${
                isCurrentSlide
                  ? "z-20 translate-x-0 opacity-100 scale-100 rotateX-0"
                  : isPrevSlide
                  ? "z-10 -translate-x-full opacity-100 scale-98 rotateX-8"
                  : isNextSlide
                  ? "z-10 translate-x-full opacity-100 scale-98 rotateX-8"
                  : "z-0 translate-x-0 opacity-0 scale-98 rotateX-8"
              }`}
              style={{
                perspective: "1000px",
                transformOrigin: "bottom",
              }}
            >
              <div
                className="relative w-full h-full"
                onClick={() => handleMovieDetails(slide.id)}
              >
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
                  className=" transition-opacity duration-600 ease-in-out rounded-3xl main-slide-img"
                  style={{
                    transformStyle: "preserve-3d",
                    opacity: isCurrentSlide ? 1 : 0.5,
                    transform: isCurrentSlide
                      ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                      : "none",
                  }}
                  onLoad={imageLoaded}
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
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full bg-white ${
              index === currentSlide ? "opacity-100" : "opacity-50"
            }`}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2">
        <button onClick={handlePrev} className="p-2 rounded-full bg-white/30">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      </div>
      <div className="absolute top-1/2 right-4 -translate-y-1/2">
        <button onClick={handleNext} className="p-2 rounded-full bg-white/30">
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default HeroCarousel;
