import React from 'react';

const SkeletonLoader = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`} />
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
      <SkeletonLoader className="aspect-square" />
      <div className="p-5 space-y-3">
        <SkeletonLoader className="h-4 w-20" />
        <SkeletonLoader className="h-6 w-full" />
        <SkeletonLoader className="h-4 w-24" />
        <div className="flex justify-between items-center">
          <SkeletonLoader className="h-8 w-20" />
          <SkeletonLoader className="h-8 w-16" />
        </div>
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default SkeletonLoader;
