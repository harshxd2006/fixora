const SkeletonCard = () => {
  return (
    <div className="glass-card h-full flex flex-col overflow-hidden animate-pulse">
      <div className="bg-white/10 h-[200px] w-full" />
      <div className="p-5 flex-1 flex flex-col">
        <div className="h-4 bg-white/15 rounded w-3/4 mb-3" />
        <div className="h-4 bg-white/10 rounded w-1/4 mb-4" />
        
        <div className="space-y-2 mb-4 mt-auto">
          <div className="h-3 bg-white/10 rounded w-full" />
          <div className="h-3 bg-white/10 rounded w-4/6" />
        </div>
        
        <div className="flex gap-2 mt-auto pt-4 border-t border-white/10">
          <div className="h-10 bg-white/15 rounded-full flex-1" />
          <div className="h-10 bg-white/15 rounded-full flex-1" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
