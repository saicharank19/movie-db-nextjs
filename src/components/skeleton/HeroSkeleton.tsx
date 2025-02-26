import { Skeleton } from "../ui/skeleton";

export default function HeroSlideSkeleton() {
  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        margin: "auto",
      }}
    >
      {/* Image Skeleton */}

      <Skeleton className="h-[300px] w-[75%] md:h-full rounded-3xl m-auto pt-[15%] pl-[2%] bg-gray-400  dark:bg-gray-700  mb-4">
        {/* Content Overlay Skeleton */}
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[320px] mb-2.5"></div>
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 max-w-[350px]"></div>
        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
      </Skeleton>
    </div>
  );
}
