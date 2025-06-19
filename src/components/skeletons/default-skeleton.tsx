// src/components/skeletons/default-skeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

const DefaultSkeleton = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <header className="flex justify-between items-center py-4 px-4 sm:mx-10 border-b">
      <Skeleton className="h-8 w-32 rounded" aria-label="Loading logo" />
      <div className="hidden sm:flex items-center gap-2">
        <Skeleton className="h-8 w-20 rounded" aria-label="Loading nav 1" />
        <Skeleton className="h-8 w-20 rounded" aria-label="Loading nav 2" />
        <Skeleton className="h-8 w-28 rounded" aria-label="Loading nav 3" />
        <Skeleton className="h-8 w-24 rounded" aria-label="Loading nav 4" />
        <Skeleton className="h-8 w-10 rounded-full" aria-label="Loading user" />
      </div>
      <div className="sm:hidden">
        <Skeleton className="h-8 w-8 rounded" aria-label="Loading menu" />
      </div>
    </header>
    <div className="w-full px-2 sm:px-4 mt-6">
      <div className="p-3 sm:p-5 border rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4">
        <Skeleton className="h-10 w-40 rounded" aria-label="Loading Bible dropdown" />
        <Skeleton className="h-10 w-40 rounded" aria-label="Loading Bible selector" />
      </div>
    </div>
    <div className="mt-6 flex justify-center items-center gap-4">
      <Skeleton className="h-10 w-10 rounded-full" aria-label="Loading prev button" />
      <Skeleton className="h-6 w-48 rounded" aria-label="Loading chapter title" />
      <Skeleton className="h-10 w-10 rounded-full" aria-label="Loading next button" />
    </div>

    {/* Content Skeleton */}
    <div className="flex flex-col items-center mt-8 px-2 sm:px-0">
      <div className="w-full max-w-3xl space-y-3">
        {[...Array(10)].map((_, i) => (
          <Skeleton
            key={i}
            className="h-5 w-full sm:w-5/6 rounded"
            aria-label={`Loading verse line ${i + 1}`}
          />
        ))}
      </div>
    </div>
  </div>
);

export default DefaultSkeleton;