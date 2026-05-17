import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Tag, Activity, Lightbulb, Battery, Zap, Brain, Focus, Settings } from 'lucide-react';

const getIconForTags = (tags) => {
  if (!tags) return <Lightbulb size={22} className="text-ink" />;
  const t = tags.join(' ').toLowerCase();
  if (t.includes('health') || t.includes('wellness')) return <Activity size={22} className="text-ink" />;
  if (t.includes('energy') || t.includes('sleep')) return <Battery size={22} className="text-ink" />;
  if (t.includes('tech') || t.includes('cables')) return <Zap size={22} className="text-ink" />;
  if (t.includes('focus') || t.includes('workspace')) return <Focus size={22} className="text-ink" />;
  if (t.includes('brain') || t.includes('mind')) return <Brain size={22} className="text-ink" />;
  return <Settings size={22} className="text-ink" />;
};

const ProblemCard = ({ problem }) => {
  return (
    <motion.div 
      whileHover={{ y: -4, borderColor: '#C8F135' }}
      className="card p-6 flex flex-col h-full group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 bg-soft-white rounded-xl flex items-center justify-center">
          {getIconForTags(problem.tags)}
        </div>
        
        {problem.trending ? (
          <span className="bg-lime text-ink text-[11px] font-bold px-2.5 py-1 rounded-full">
            Trending
          </span>
        ) : (
          <span className="bg-ink text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
            New
          </span>
        )}
      </div>

      <div className="flex-1">
        <h3 className="text-[18px] font-semibold text-ink line-clamp-2">
          {problem.title}
        </h3>
        <p className="text-[14px] text-slate-muted mt-2 line-clamp-2">
          {problem.shortDesc}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {problem.tags?.slice(0, 3).map(tag => (
          <span key={tag} className="tag">
            <Tag size={10} />
            {tag}
          </span>
        ))}
      </div>

      <div className="border-t border-muted-white mt-4 pt-4 flex items-center justify-between">
        <div className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
          problem.difficulty === 'Easy' ? 'bg-[#DCFCE7] text-[#16A34A]' :
          problem.difficulty === 'Medium' ? 'bg-[#FEF9C3] text-[#CA8A04]' :
          'bg-[#FEE2E2] text-[#DC2626]'
        }`}>
          {problem.difficulty} Fix
        </div>
        
        <Link 
          to={`/problems/${problem.id}`} 
          className="text-[14px] font-semibold text-ink flex items-center gap-1 group-hover:text-lime transition-colors"
        >
          Fix This <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ProblemCard;
