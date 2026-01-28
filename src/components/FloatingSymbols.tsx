'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Symbol {
  id: number;
  char: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const SYMBOLS = [
  '0', '1', '∫', 'Σ', 'π', '∞', 'λ', 'Δ', '∂', 'α', 'β', 'θ',
  '{ }', '< />', '( )', '[ ]', '=>', '&&', '||', '++', '!=', '==',
  'fn', 'AI', 'ML', '01', '10', '∇', '∈', '∀', '∃'
];

export default function FloatingSymbols() {
  const [symbols, setSymbols] = useState<Symbol[]>([]);

  useEffect(() => {
    const generateSymbols = () => {
      const newSymbols: Symbol[] = [];
      const count = window.innerWidth < 768 ? 25 : 50;
      
      for (let i = 0; i < count; i++) {
        newSymbols.push({
          id: i,
          char: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 20 + 12,
          duration: Math.random() * 10 + 15,
          delay: Math.random() * 5,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
      setSymbols(newSymbols);
    };

    generateSymbols();
    
    const handleResize = () => generateSymbols();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030014]/50 to-[#030014]" />
      
      {/* Radial gradient in center */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(0,240,255,0.15) 0%, rgba(124,58,237,0.1) 40%, transparent 70%)'
        }}
      />
      
      {/* Floating symbols */}
      {symbols.map((symbol) => (
        <motion.div
          key={symbol.id}
          className="absolute font-mono text-[var(--accent)]"
          style={{
            left: `${symbol.x}%`,
            top: `${symbol.y}%`,
            fontSize: `${symbol.size}px`,
            opacity: symbol.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() > 0.5 ? 10 : -10, 0],
            rotate: [0, Math.random() > 0.5 ? 10 : -10, 0],
            opacity: [symbol.opacity, symbol.opacity * 2, symbol.opacity],
          }}
          transition={{
            duration: symbol.duration,
            delay: symbol.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {symbol.char}
        </motion.div>
      ))}
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,240,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,240,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
}
