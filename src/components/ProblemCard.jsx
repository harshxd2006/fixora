import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Tag, Activity, Lightbulb, Battery, Zap, Brain, Focus, Settings } from 'lucide-react';

const getIconForTags = (tags) => {
  if (!tags) return <Lightbulb size={22} className="text-white" />;
  const t = tags.join(' ').toLowerCase();
  if (t.includes('health') || t.includes('wellness')) return <Activity size={22} className="text-white" />;
  if (t.includes('energy') || t.includes('sleep')) return <Battery size={22} className="text-white" />;
  if (t.includes('tech') || t.includes('cables')) return <Zap size={22} className="text-white" />;
  if (t.includes('focus') || t.includes('workspace')) return <Focus size={22} className="text-white" />;
  if (t.includes('brain') || t.includes('mind')) return <Brain size={22} className="text-white" />;
  return <Settings size={22} className="text-white" />;
};

const ProblemCard = ({ problem }) => {
  return (
    <motion.div 
      whileHover={{ y: -4, borderColor: '#E5B268' }}
      className="bg-white/10 backdrop-blur-lg border border-white/15 rounded-[24px] p-6 flex flex-col h-full group hover:bg-white/15 transition-all text-white shadow-card"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 bg-white/10 border border-white/15 rounded-xl flex items-center justify-center">
          {getIconForTags(problem.tags)}
        </div>
        
        {problem.trending ? (
          <span className="bg-[#E5B268] text-ink text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            Trending
          </span>
        ) : (
          <span className="bg-white/10 text-white border border-white/15 text-[11px] font-bold px-2.5 py-1 rounded-full">
            New
          </span>
        )}
      </div>

      <div className="flex-1">
        <h3 className="text-[18px] font-semibold text-white line-clamp-2">
          {problem.title}
        </h3>
        <p className="text-[14px] text-white/70 mt-2 line-clamp-2">
          {problem.shortDesc}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {problem.tags?.slice(0, 3).map(tag => (
          <span key={tag} className="bg-white/10 text-white/70 border border-white/15 text-[11px] font-medium px-2.5 py-1 rounded-full inline-flex items-center gap-1">
            <Tag size={10} />
            {tag}
          </span>
        ))}
      </div>

      <div className="border-t border-white/10 mt-4 pt-4 flex items-center justify-between">
        <div className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/10 text-white/80 border border-white/15">
          {problem.difficulty} Fix
        </div>
        
        <Link 
          to={`/problems/${problem.id}`} 
          className="text-[14px] font-semibold text-white flex items-center gap-1 group-hover:text-[#E5B268] transition-colors"
        >
          Fix This <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ProblemCard;
