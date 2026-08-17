import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Sparkles, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { chatWithAI } from '../services/ai';

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Hi! I am Fixora AI. Tell me what problem is bothering you and I will help you find the perfect fix.' 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = input.trim();
    setInput('');
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);
    
    // Skip the first welcome message to avoid Groq's LLaMA 3 strict role alternation error
    const history = messages.slice(1).map(m => ({ 
      role: m.role, 
      content: typeof m.content === 'string' ? m.content : m.content?.text || '' 
    }));

    const res = await chatWithAI(userMessage, history);
    
    const textContent = typeof res === 'string' ? res : res.text;
    const recommendedProducts = typeof res === 'object' ? res.products : [];
    
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: textContent,
      products: recommendedProducts 
    }]);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-[340px] sm:w-[370px] bg-[#0A0A0A]/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden text-white"
          >
            {/* Header */}
            <div className="bg-white/10 p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-[#E5B268] rounded-full flex items-center justify-center">
                  <Sparkles size={16} className="text-ink" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Fixora AI</h3>
                  <p className="text-white/60 text-[11px]">Powered by Groq • Instant Fix Assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors p-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[340px] overflow-y-auto p-4 space-y-3.5 bg-white/5">
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} gap-1.5`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[#E5B268] text-ink font-semibold rounded-br-sm' 
                      : 'glass-card text-white border-white/15 rounded-bl-sm'
                  }`}>
                    {msg.content}
                  </div>

                  {/* Interactive Recommended Product Link Cards */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="w-[90%] space-y-1.5 mt-1 ml-1">
                      <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#E5B268] flex items-center gap-1">
                        <Sparkles size={11} /> Recommended Fixes
                      </p>
                      <div className="space-y-2">
                        {msg.products.map(product => (
                          <Link
                            key={product.id}
                            to={`/products/${product.id}`}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2.5 p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 hover:border-[#E5B268]/60 transition-all group shadow-sm"
                          >
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-white truncate group-hover:text-[#E5B268] transition-colors">
                                {product.name}
                              </h4>
                              <p className="text-[11px] font-semibold text-[#E5B268]">
                                ₹{product.price?.toLocaleString('en-IN')}
                              </p>
                            </div>
                            <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-[#E5B268] group-hover:text-ink text-white flex items-center justify-center transition-all flex-shrink-0">
                              <ArrowUpRight size={13} />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="glass-card rounded-2xl rounded-bl-sm px-4 py-2.5">
                    <Loader2 size={14} className="animate-spin text-[#E5B268]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white/5 border-t border-white/15 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your problem..."
                className="flex-1 glass-input rounded-full h-10 px-4 text-[13px]"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="w-10 h-10 bg-[#E5B268] rounded-full flex items-center justify-center disabled:opacity-50 hover:brightness-105 transition-all flex-shrink-0"
              >
                <Send size={14} className="text-ink" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/20 hover:border-[#E5B268] rounded-full flex items-center justify-center shadow-2xl relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="x" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X size={22} className="text-white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
              <MessageCircle size={22} className="text-[#E5B268]" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Pulse dot */}
        <span className="absolute top-1 right-1 w-3 h-3 bg-[#E5B268] rounded-full border-2 border-[#0A0A0A]"></span>
      </motion.button>
    </div>
  );
};

export default AIChatWidget;
