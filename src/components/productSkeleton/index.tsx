export function ProductSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-lg p-4 flex flex-col animate-pulse h-110">
      <div className="w-full h-48 bg-gray-200 rounded-md mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-3" />
      <div className="h-3 bg-gray-100 rounded w-1/2 mx-auto mb-4" />
      <div className="flex justify-center gap-1 mb-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-3 h-3 bg-gray-100 rounded-full" />
        ))}
      </div>
      <div className="mt-auto space-y-3">
        <div className="h-3 bg-gray-100 rounded w-1/4 mx-auto" />
        <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto" />
        <div className="h-10 bg-gray-200 rounded w-full mt-2" />
      </div>
    </div>
  );
}
