import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
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
    const history = messages.slice(1).map(m => ({ role: m.role, content: m.content }));
    const response = await chatWithAI(userMessage, history);
    
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
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
            className="mb-4 w-[340px] bg-white rounded-[24px] shadow-2xl border border-border-light overflow-hidden"
          >
            {/* Header */}
            <div className="bg-ink p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#E5B268] rounded-full flex items-center justify-center">
                  <Sparkles size={16} className="text-ink" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-[14px]">Fixora AI</h3>
                  <p className="text-[#6B6B6B] text-[11px]">Powered by Groq • Always online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[#6B6B6B] hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[300px] overflow-y-auto p-4 space-y-3 bg-warm-white">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-ink text-white rounded-br-sm' 
                      : 'bg-white text-ink border border-border-light rounded-bl-sm shadow-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-border-light rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm">
                    <Loader2 size={14} className="animate-spin text-slate-muted" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-border-light flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your problem..."
                className="flex-1 bg-warm-white border border-border-light rounded-full px-4 py-2 text-[13px] outline-none focus:border-ink transition-colors"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="w-9 h-9 bg-[#E5B268] rounded-full flex items-center justify-center disabled:opacity-50 hover:brightness-105 transition-all flex-shrink-0"
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
        className="w-14 h-14 bg-ink rounded-full flex items-center justify-center shadow-2xl relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="x" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X size={22} className="text-white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
              <MessageCircle size={22} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Pulse dot */}
        <span className="absolute top-1 right-1 w-3 h-3 bg-[#E5B268] rounded-full border-2 border-ink"></span>
      </motion.button>
    </div>
  );
};

export default AIChatWidget;
