import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 5 second delay

    return () => clearTimeout(timer);
  }, []);

  if (!loading) {
    return null;
  }

  return (
    <div className="h-screen w-full p-4">
      <div className="flex flex-col space-y-4">
        <Skeleton className="h-10 w-1/2 rounded-full" />
        <Skeleton className="h-8 w-1/3 rounded-full" />
        <Skeleton className="h-screen w-full rounded-3xl" />
      </div>
    </div>
  );
};

export default SkeletonLoader;
