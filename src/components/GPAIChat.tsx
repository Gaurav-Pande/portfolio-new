'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isTyping?: boolean;
}

interface Prompt {
  label: string;
  command: string;
  icon: string;
}

// Simple markdown-like renderer
function renderContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  
  lines.forEach((line, i) => {
    const key = i;
    
    // Headings
    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={key} className="text-xl font-bold text-white mb-3 mt-4 first:mt-0">
          {line.slice(2)}
        </h1>
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key} className="text-lg font-semibold text-orange-300 mb-2 mt-4">
          {line.slice(3)}
        </h2>
      );
    }
    // Bullet points
    else if (line.startsWith('• ') || line.startsWith('- ')) {
      elements.push(
        <div key={key} className="flex gap-2 mb-1.5 ml-2">
          <span className="text-orange-400">•</span>
          <span className="text-gray-300">{renderInlineStyles(line.slice(2))}</span>
        </div>
      );
    }
    // Bold lines (like **text**)
    else if (line.startsWith('**') && line.includes(':**')) {
      const parts = line.split(':**');
      const label = parts[0].replace(/\*\*/g, '');
      const value = parts[1]?.replace(/\*\*/g, '') || '';
      elements.push(
        <div key={key} className="mb-1.5">
          <span className="text-orange-300 font-medium">{label}:</span>
          <span className="text-gray-300">{value}</span>
        </div>
      );
    }
    // Code blocks or tech tags
    else if (line.startsWith('`Tech:') || line.startsWith('`')) {
      elements.push(
        <div key={key} className="mb-2">
          <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400 font-mono">
            {line.replace(/`/g, '')}
          </span>
        </div>
      );
    }
    // Progress bars (skill levels)
    else if (line.includes('████')) {
      const parts = line.split(/\s+/);
      const skill = parts[0];
      const bar = parts.slice(1).join(' ');
      elements.push(
        <div key={key} className="flex items-center gap-3 mb-1 font-mono text-sm">
          <span className="text-gray-300 w-24">{skill}</span>
          <span className="text-orange-400/80">{bar}</span>
        </div>
      );
    }
    // Empty lines
    else if (line.trim() === '') {
      elements.push(<div key={key} className="h-2" />);
    }
    // Regular text
    else {
      elements.push(
        <p key={key} className="text-gray-300 mb-1.5 leading-relaxed">
          {renderInlineStyles(line)}
        </p>
      );
    }
  });
  
  return elements;
}

// Render inline bold text
function renderInlineStyles(text: string) {
  // Handle **bold** text
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <span key={i} className="text-white font-medium">{part.slice(2, -2)}</span>;
    }
    return part;
  });
}

const PROMPTS: Prompt[] = [
  { label: 'About Me', command: 'whoami', icon: '👤' },
  { label: 'Experience', command: 'cat experience.md', icon: '💼' },
  { label: 'Projects', command: 'ls ~/projects', icon: '🚀' },
  { label: 'Skills', command: 'grep -r "skills"', icon: '⚡' },
  { label: 'Education', command: 'cat education.txt', icon: '🎓' },
  { label: 'Contact', command: 'curl contact.json', icon: '📬' },
];

const RESPONSES: Record<string, string> = {
  'whoami': `# Gaurav Pande

Software Engineer at Microsoft Azure, passionate about building intelligent systems at scale.

I'm a full-stack engineer with a deep interest in distributed systems, machine learning, and open source. Currently working on Azure's core infrastructure, helping developers build and deploy applications globally.

When I'm not coding, you'll find me exploring AI research papers, contributing to open source projects, or writing about technology on my blog.

**Location:** Seattle, WA
**Current Role:** Software Engineer @ Microsoft Azure
**Focus Areas:** Distributed Systems, ML/AI, Cloud Infrastructure`,

  'cat experience.md': `# Work Experience

## Software Engineer @ Microsoft Azure
**2021 - Present** | Seattle, WA

• Building core infrastructure services handling millions of requests/second
• Designing and implementing distributed systems for global-scale deployments
• Leading initiatives on ML-powered optimization for resource allocation
• Mentoring junior engineers and driving technical design reviews

## Software Engineer Intern @ Microsoft
**Summer 2020** | Redmond, WA

• Developed features for Azure DevOps pipeline optimization
• Reduced build times by 40% through intelligent caching strategies
• Received full-time offer based on internship performance

## Research Assistant @ Georgia Tech
**2019 - 2021** | Atlanta, GA

• Conducted research on distributed machine learning systems
• Published paper on efficient gradient compression techniques
• Built prototype systems for federated learning experiments`,

  'ls ~/projects': `# Featured Projects

## 🔥 Real-time ML Inference Engine
High-performance inference serving system handling 100K+ requests/sec
\`Tech: Rust, CUDA, Kubernetes\`

## 🌐 Distributed Key-Value Store
Fault-tolerant, strongly consistent KV store with Raft consensus
\`Tech: Go, gRPC, etcd\`

## 🤖 AI Code Review Assistant
LLM-powered tool for automated code review and suggestions
\`Tech: Python, GPT-4, GitHub Actions\`

## 📊 Telemetry Analytics Platform
Real-time analytics pipeline processing 1M+ events/minute
\`Tech: Apache Kafka, Spark, ClickHouse\`

## 🎨 This Portfolio Website
Interactive space-themed portfolio with black hole animation
\`Tech: Next.js, TypeScript, Canvas API\``,

  'grep -r "skills"': `# Technical Skills

## Languages
Python ████████████████████ Expert
Go     ████████████████░░░░ Advanced
Rust   ██████████████░░░░░░ Advanced
TypeScript ████████████████ Advanced
C++    ████████████░░░░░░░░ Intermediate

## Frameworks & Tools
• Cloud: Azure, AWS, GCP, Kubernetes, Docker
• ML/AI: PyTorch, TensorFlow, LangChain, OpenAI
• Databases: PostgreSQL, Redis, Cosmos DB, ClickHouse
• Infrastructure: Terraform, Pulumi, GitHub Actions

## Specializations
• Distributed Systems Design
• Machine Learning Systems
• High-Performance Computing
• API Design & Microservices`,

  'cat education.txt': `# Education

## Master of Science in Computer Science
**Georgia Institute of Technology** | 2019 - 2021

• Specialization: Machine Learning & Systems
• GPA: 4.0/4.0
• Thesis: "Efficient Distributed Training of Large Language Models"
• Teaching Assistant for Graduate Algorithms

## Bachelor of Technology in Computer Science
**Indian Institute of Technology** | 2015 - 2019

• First Class with Distinction
• Undergraduate Research in Parallel Computing
• President of ACM Student Chapter`,

  'curl contact.json': `{
  "email": "gaurav@example.com",
  "linkedin": "linkedin.com/in/gauravpande",
  "github": "github.com/gaurav-pande",
  "twitter": "@gauravpande",
  "location": "Seattle, WA",
  "availability": "Open to interesting conversations",
  "response_time": "Usually within 24 hours"
}`,
};

interface GPAIChatProps {
  onExit: () => void;
}

export default function GPAIChat({ onExit }: GPAIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const typeResponse = async (response: string) => {
    setIsTyping(true);
    
    // Add typing message
    setMessages(prev => [...prev, { role: 'assistant', content: '', isTyping: true }]);
    
    // Simulate typing
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      currentIndex += 5; // Type 5 chars at a time
      
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage && lastMessage.role === 'assistant') {
          lastMessage.content = response.slice(0, currentIndex);
        }
        return newMessages;
      });
      
      if (currentIndex >= response.length) {
        clearInterval(typingInterval);
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage) {
            lastMessage.isTyping = false;
            lastMessage.content = response;
          }
          return newMessages;
        });
        setIsTyping(false);
      }
    }, 8);
  };

  const handlePromptClick = async (prompt: Prompt) => {
    if (isTyping) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: `$ ${prompt.command}` }]);
    
    // Get response
    const response = RESPONSES[prompt.command] || 'Command not found. Try another prompt.';
    
    // Small delay before response
    await new Promise(resolve => setTimeout(resolve, 400));
    await typeResponse(response);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;
    
    const command = inputValue.trim().toLowerCase();
    setInputValue('');
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: `$ ${command}` }]);
    
    // Find matching response
    let response = RESPONSES[command];
    if (!response) {
      const matchedKey = Object.keys(RESPONSES).find(key => 
        key.includes(command) || command.includes(key.split(' ')[0])
      );
      response = matchedKey ? RESPONSES[matchedKey] : 
        `Command '${command}' not recognized.\n\nTry: whoami, cat experience.md, ls ~/projects, grep -r "skills", cat education.txt, or curl contact.json`;
    }
    
    await new Promise(resolve => setTimeout(resolve, 400));
    await typeResponse(response);
  };

  const hasMessages = messages.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#0a0a12] z-50 flex flex-col"
    >
      {/* Subtle background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255, 120, 50, 0.03) 0%, transparent 50%)',
        }}
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-4">
          <motion.button
            onClick={onExit}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm">Back</span>
          </motion.button>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-medium text-sm">GPAI</h1>
            <p className="text-gray-500 text-xs">Gaurav Pande AI</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          Online
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 overflow-hidden flex flex-col">
        {/* Messages Area */}
        <div className={`flex-1 overflow-y-auto ${!hasMessages ? 'flex items-center justify-center' : ''}`}>
          {/* Welcome State - Centered */}
          {!hasMessages && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center px-6 py-8 w-full max-w-xl"
            >
              <h2 className="text-2xl font-semibold text-white mb-3">
                Welcome to GPAI
              </h2>
              <p className="text-gray-400 mb-8">
                I'm an AI interface to explore Gaurav's portfolio.<br />
                Select a topic below or type your own command.
              </p>
              
              {/* Prompt Grid */}
              <div className="grid grid-cols-3 gap-3">
                {PROMPTS.map((prompt, index) => (
                  <motion.button
                    key={prompt.command}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    onClick={() => handlePromptClick(prompt)}
                    disabled={isTyping}
                    className="flex flex-col items-center gap-3 p-5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <span className="text-2xl">{prompt.icon}</span>
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                      {prompt.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Messages */}
          {hasMessages && (
            <div className="max-w-3xl mx-auto px-6 py-8 w-full">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 ${message.role === 'user' ? 'flex justify-end' : ''}`}
                >
                  {message.role === 'user' ? (
                    <div className="inline-block px-4 py-2 rounded-2xl rounded-br-md bg-orange-500/20 border border-orange-500/30">
                      <code className="text-orange-300 text-sm font-mono">{message.content}</code>
                    </div>
                  ) : (
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center">
                        <Sparkles size={14} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="text-sm">
                          {renderContent(message.content)}
                          {message.isTyping && (
                            <span className="inline-block w-2 h-4 bg-orange-400 animate-pulse ml-0.5 align-middle" />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Quick prompts when in conversation */}
        {hasMessages && !isTyping && (
          <div className="border-t border-white/5 bg-[#0a0a12]/80 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto px-8 py-5">
              <div className="flex gap-4 justify-center flex-wrap">
                {PROMPTS.map((prompt) => (
                  <button
                    key={prompt.command}
                    onClick={() => handlePromptClick(prompt)}
                    className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-base text-gray-300 hover:text-white hover:bg-white/10 hover:border-orange-500/40 transition-all whitespace-nowrap"
                  >
                    <span className="mr-2">{prompt.icon}</span>{prompt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-white/5 bg-[#0a0a12]">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-6 sm:px-8 py-8">
            <div className="flex items-center gap-4 bg-white/[0.04] rounded-2xl border border-white/[0.1] px-6 py-5 focus-within:border-orange-500/40 focus-within:bg-white/[0.06] transition-all shadow-lg shadow-black/20">
              <span className="text-orange-400 font-mono text-xl">$</span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a command..."
                disabled={isTyping}
                className="flex-1 bg-transparent text-white text-lg placeholder-gray-500 outline-none disabled:opacity-50"
              />
              <motion.button
                type="submit"
                disabled={isTyping || !inputValue.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Send size={22} />
              </motion.button>
            </div>
            <p className="text-center text-gray-500 text-sm mt-4">
              Commands: whoami • ls ~/projects • cat experience.md • grep -r "skills"
            </p>
          </form>
        </div>
      </main>
    </motion.div>
  );
}
