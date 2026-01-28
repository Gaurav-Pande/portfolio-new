'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Code, 
  FileText, 
  Zap,
  RefreshCw,
  Copy,
  Check,
  Beaker,
  Brain,
  MessageSquare
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AI_DEMOS = [
  {
    id: 'chat',
    title: 'Chat with Gaurav Bot',
    description: 'An AI assistant trained on my knowledge and experience',
    icon: MessageSquare,
    color: 'var(--accent)',
    available: true,
  },
  {
    id: 'code-review',
    title: 'Code Review Assistant',
    description: 'Get AI-powered feedback on your code snippets',
    icon: Code,
    color: 'var(--accent-secondary)',
    available: true,
  },
  {
    id: 'resume-analyzer',
    title: 'Resume Analyzer',
    description: 'Get AI suggestions to improve your resume',
    icon: FileText,
    color: 'var(--accent-tertiary)',
    available: false,
  },
  {
    id: 'ml-playground',
    title: 'ML Playground',
    description: 'Interactive machine learning experiments',
    icon: Brain,
    color: '#10b981',
    available: false,
  },
];

const SAMPLE_PROMPTS = [
  "What's your experience with distributed systems?",
  "Tell me about your ML projects at Microsoft",
  "How did you prepare for FAANG interviews?",
  "What advice do you have for OMSCS students?",
];

export default function AILabPage() {
  const [selectedDemo, setSelectedDemo] = useState('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm Gaurav Bot 🤖 - an AI trained on Gaurav's experience and knowledge. I can answer questions about software engineering, machine learning, career advice, and more. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response (replace with actual API call later)
    setTimeout(() => {
      const responses = [
        "That's a great question! Based on my experience at Microsoft and Cisco, I'd say the key to mastering distributed systems is understanding the trade-offs between consistency, availability, and partition tolerance (CAP theorem). Start with basics like networking, then move to consensus algorithms like Raft and Paxos.",
        "At Georgia Tech, I focused heavily on ML coursework including Deep Learning, Computer Vision, and NLP. The practical projects were invaluable - we built everything from recommendation systems to neural machine translation models. I'd recommend starting with Andrew Ng's course, then diving into specific areas.",
        "For technical interviews, I followed a structured approach: 1) Master data structures & algorithms (LeetCode top 150), 2) System design (read 'Designing Data-Intensive Applications'), 3) Behavioral prep using STAR method. Consistency is key - I practiced for 2-3 hours daily for 3 months.",
        "The OMSCS program is amazing but demanding. My advice: 1) Take one course first semester to adjust, 2) Join study groups early, 3) Use office hours liberally, 4) Start assignments early - they take longer than expected. The community on Slack is incredibly helpful!",
      ];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: "Chat cleared! How can I help you today?",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Beaker className="text-[var(--accent)]" size={40} />
            <h1 className="text-4xl md:text-5xl font-bold">
              AI <span className="gradient-text">Lab</span>
            </h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore interactive AI experiments and tools. Chat with an AI trained on my knowledge,
            get code reviews, and more.
          </p>
        </motion.section>

        {/* Demo Selection */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {AI_DEMOS.map((demo) => (
              <motion.button
                key={demo.id}
                onClick={() => demo.available && setSelectedDemo(demo.id)}
                whileHover={demo.available ? { scale: 1.02, y: -2 } : {}}
                whileTap={demo.available ? { scale: 0.98 } : {}}
                className={`relative p-4 rounded-xl border text-left transition-all duration-300 ${
                  selectedDemo === demo.id
                    ? 'bg-white/10 border-[var(--accent)]/50'
                    : demo.available
                    ? 'glass hover:border-white/20 cursor-pointer'
                    : 'glass opacity-50 cursor-not-allowed'
                }`}
              >
                {!demo.available && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 text-xs bg-gray-700 rounded-full">
                    Coming Soon
                  </span>
                )}
                <demo.icon 
                  size={24} 
                  className="mb-2"
                  style={{ color: demo.color }}
                />
                <h3 className="font-medium text-white text-sm mb-1">{demo.title}</h3>
                <p className="text-gray-500 text-xs line-clamp-2">{demo.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Chat Interface */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass rounded-2xl overflow-hidden"
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-medium text-white">Gaurav Bot</h3>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={handleClearChat}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Clear chat"
            >
              <RefreshCw size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="h-[400px] overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user' 
                        ? 'bg-[var(--accent-secondary)]' 
                        : 'bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)]'
                    }`}
                  >
                    {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div 
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-[var(--accent-secondary)] text-white rounded-tr-none'
                        : 'bg-white/5 border border-white/10 rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <div className={`flex items-center gap-2 mt-2 ${message.role === 'user' ? 'justify-end' : ''}`}>
                      <span className="text-xs text-gray-500">
                        {message.timestamp.toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                      {message.role === 'assistant' && (
                        <button
                          onClick={() => handleCopy(message.content)}
                          className="text-gray-500 hover:text-white transition-colors"
                          title="Copy response"
                        >
                          {copied ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Sample Prompts */}
          <div className="px-4 pb-2">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {SAMPLE_PROMPTS.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInput(prompt)}
                  className="flex-shrink-0 px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent)]/50 transition-colors"
                disabled={isLoading}
              />
              <motion.button
                type="submit"
                disabled={!input.trim() || isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-[var(--accent)] text-black font-medium rounded-xl hover:bg-[var(--accent)]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send size={18} />
                <span className="hidden sm:inline">Send</span>
              </motion.button>
            </div>
          </form>
        </motion.section>

        {/* Info Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          <div className="glass rounded-xl p-6 text-center">
            <Sparkles className="mx-auto mb-3 text-[var(--accent)]" size={32} />
            <h3 className="font-semibold text-white mb-2">Powered by AI</h3>
            <p className="text-gray-400 text-sm">
              Built with modern LLMs and fine-tuned on professional knowledge and experience.
            </p>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <Zap className="mx-auto mb-3 text-[var(--accent-tertiary)]" size={32} />
            <h3 className="font-semibold text-white mb-2">Fast Responses</h3>
            <p className="text-gray-400 text-sm">
              Optimized for quick, relevant answers to your questions about tech and career.
            </p>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <Code className="mx-auto mb-3 text-[var(--accent-secondary)]" size={32} />
            <h3 className="font-semibold text-white mb-2">Code Aware</h3>
            <p className="text-gray-400 text-sm">
              Can discuss code, review snippets, and provide technical guidance.
            </p>
          </div>
        </motion.section>

        {/* Premium CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="gradient-border p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-3">Want more AI features?</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Unlock unlimited chat, code review, resume analysis, and priority support.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] text-black font-medium rounded-lg"
            >
              Upgrade to Pro - $9/month
            </motion.button>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
