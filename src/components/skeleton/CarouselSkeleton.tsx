export default function CarouselSkeleton() {
  return (
    <div
      role="status"
      className="animate-pulse flex w-[screen] justify-between"
    >
      <div className="h-[220px] bg-gray-400 rounded-2xl dark:bg-gray-700 w-[180px] mr-4"></div>
      <div className="h-[220px] bg-gray-400 rounded-2xl dark:bg-gray-700 w-[180px] mr-4"></div>
      <div className="h-[220px] bg-gray-400 rounded-2xl dark:bg-gray-700 w-[180px] mr-4"></div>
      <div className="h-[220px] bg-gray-400 rounded-2xl dark:bg-gray-700 w-[180px] mr-4"></div>
      <div className="h-[220px] bg-gray-400 rounded-2xl dark:bg-gray-700 w-[180px] mr-4"></div>
      <div className="h-[220px] bg-gray-400 rounded-2xl dark:bg-gray-700 w-[180px] mr-4"></div>
      <div className="h-[220px] bg-gray-400 rounded-2xl dark:bg-gray-700 w-[180px] mb-4"></div>
    </div>
  );
}
