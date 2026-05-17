const SkeletonCard = () => {
  return (
    <div className="card h-full flex flex-col overflow-hidden animate-pulse">
      <div className="bg-muted-white h-[220px] w-full" />
      <div className="p-5 flex-1 flex flex-col">
        <div className="h-5 bg-muted-white rounded w-3/4 mb-3" />
        <div className="h-4 bg-muted-white rounded w-1/4 mb-4" />
        
        <div className="space-y-2 mb-4 mt-auto">
          <div className="h-3 bg-muted-white rounded w-full" />
          <div className="h-3 bg-muted-white rounded w-5/6" />
        </div>
        
        <div className="flex gap-2 mt-auto pt-4 border-t border-muted-white">
          <div className="h-10 bg-muted-white rounded-full flex-1" />
          <div className="h-10 bg-muted-white rounded-full flex-1" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
