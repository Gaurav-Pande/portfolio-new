'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  symbol: string;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  merged: boolean;
}

interface MergedEquation {
  id: number;
  x: number;
  y: number;
  text: string;
  opacity: number;
  scale: number;
}

const SYMBOLS = ['0', '1', '+', '-', '×', '÷', '=', '<', '>', '{', '}', '(', ')', '[', ']', 'λ', 'π', '∞', '∑', '∫', 'Δ', '∂', 'α', 'β', 'θ', 'fn', '=>', '&&', '||'];

const EQUATIONS = [
  'f(x) = x²',
  'E = mc²',
  'λx.x',
  '∑(n)',
  '∂f/∂x',
  'O(log n)',
  'P(A|B)',
  'x → ∞',
  'a + bi',
  'const x',
  'async fn',
  'return 1',
  '() => {}',
  'if (true)',
  'x === y',
];

const COLORS = ['#00f0ff', '#7c3aed', '#f59e0b', '#10b981', '#ec4899'];

export default function InteractiveHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const equationsRef = useRef<MergedEquation[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isPressed: false });
  const animationRef = useRef<number | undefined>(undefined);
  const lastSpawnRef = useRef(0);
  
  const [showContent, setShowContent] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  // Spawn initial particles
  const spawnParticle = useCallback((x?: number, y?: number, burst = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const particle: Particle = {
      id: Date.now() + Math.random(),
      x: x ?? Math.random() * canvas.width,
      y: y ?? Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * (burst ? 8 : 2),
      vy: (Math.random() - 0.5) * (burst ? 8 : 2),
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      size: Math.random() * 16 + 12,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: 0,
      maxLife: 300 + Math.random() * 200,
      merged: false,
    };

    particlesRef.current.push(particle);
  }, []);

  // Spawn equation when particles merge
  const spawnEquation = useCallback((x: number, y: number) => {
    const equation: MergedEquation = {
      id: Date.now() + Math.random(),
      x,
      y,
      text: EQUATIONS[Math.floor(Math.random() * EQUATIONS.length)],
      opacity: 1,
      scale: 0,
    };
    equationsRef.current.push(equation);
    setInteractionCount(prev => prev + 1);
  }, []);

  // Main animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Clear canvas with fade effect
    ctx.fillStyle = 'rgba(3, 0, 20, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const mouse = mouseRef.current;
    const particles = particlesRef.current;
    const equations = equationsRef.current;

    // Spawn new particles periodically
    const now = Date.now();
    if (now - lastSpawnRef.current > 100 && particles.length < 80) {
      spawnParticle();
      lastSpawnRef.current = now;
    }

    // Update and draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      
      // Calculate distance to mouse
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Gravitational attraction to cursor
      if (dist > 20 && dist < 400) {
        const force = mouse.isPressed ? 0.8 : 0.15;
        const attraction = force / (dist * 0.1);
        p.vx += (dx / dist) * attraction;
        p.vy += (dy / dist) * attraction;
      }
      
      // Repulsion when too close
      if (dist < 60 && dist > 0) {
        const repulsion = 2 / dist;
        p.vx -= (dx / dist) * repulsion;
        p.vy -= (dy / dist) * repulsion;
      }

      // Apply velocity with damping
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.98;
      p.vy *= 0.98;
      
      // Bounce off edges
      if (p.x < 0 || p.x > canvas.width) p.vx *= -0.8;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -0.8;
      p.x = Math.max(0, Math.min(canvas.width, p.x));
      p.y = Math.max(0, Math.min(canvas.height, p.y));

      // Update life
      p.life++;
      
      // Check for particle collisions near mouse (merging)
      if (dist < 80 && !p.merged) {
        for (let j = i - 1; j >= 0; j--) {
          const other = particles[j];
          if (other.merged) continue;
          
          const pdx = p.x - other.x;
          const pdy = p.y - other.y;
          const pDist = Math.sqrt(pdx * pdx + pdy * pdy);
          
          if (pDist < 25) {
            // Merge particles into equation
            p.merged = true;
            other.merged = true;
            spawnEquation((p.x + other.x) / 2, (p.y + other.y) / 2);
            break;
          }
        }
      }

      // Remove dead or merged particles
      if (p.life > p.maxLife || p.merged) {
        particles.splice(i, 1);
        continue;
      }

      // Draw particle
      const alpha = Math.min(1, (p.maxLife - p.life) / 50, p.life / 20);
      ctx.save();
      ctx.globalAlpha = alpha * 0.9;
      ctx.font = `${p.size}px "Geist Mono", monospace`;
      ctx.fillStyle = p.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Add glow effect
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 10;
      
      ctx.fillText(p.symbol, p.x, p.y);
      ctx.restore();

      // Draw connection lines to nearby particles
      for (let j = i - 1; j >= 0; j--) {
        const other = particles[j];
        const ldx = p.x - other.x;
        const ldy = p.y - other.y;
        const lDist = Math.sqrt(ldx * ldx + ldy * ldy);
        
        if (lDist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = (1 - lDist / 100) * 0.2;
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }
    }

    // Update and draw equations
    for (let i = equations.length - 1; i >= 0; i--) {
      const eq = equations[i];
      
      // Float upward and fade
      eq.y -= 0.5;
      eq.scale = Math.min(1, eq.scale + 0.05);
      eq.opacity -= 0.005;
      
      if (eq.opacity <= 0) {
        equations.splice(i, 1);
        continue;
      }

      // Draw equation
      ctx.save();
      ctx.globalAlpha = eq.opacity;
      ctx.font = `bold 18px "Geist Mono", monospace`;
      ctx.fillStyle = '#00f0ff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 15;
      
      ctx.translate(eq.x, eq.y);
      ctx.scale(eq.scale, eq.scale);
      ctx.fillText(eq.text, 0, 0);
      ctx.restore();
    }

    // Draw cursor glow
    ctx.save();
    const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.isPressed ? 150 : 80);
    gradient.addColorStop(0, 'rgba(0, 240, 255, 0.15)');
    gradient.addColorStop(0.5, 'rgba(124, 58, 237, 0.05)');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, mouse.isPressed ? 150 : 80, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Show content after some interactions
    if (interactionCount > 3 && !showContent) {
      setShowContent(true);
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [spawnParticle, spawnEquation, interactionCount, showContent]);

  // Handle mouse/touch events
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const handleResize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current.x = x;
      mouseRef.current.y = y;
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      mouseRef.current.isPressed = true;
      // Spawn burst of particles on click
      for (let i = 0; i < 8; i++) {
        spawnParticle(mouseRef.current.x, mouseRef.current.y, true);
      }
    };

    const handleMouseUp = () => {
      mouseRef.current.isPressed = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseRef.current.x = touch.clientX - rect.left;
      mouseRef.current.y = touch.clientY - rect.top;
    };

    handleResize();
    
    // Spawn initial particles
    for (let i = 0; i < 40; i++) {
      spawnParticle();
    }

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchstart', handleMouseDown);
    canvas.addEventListener('touchend', handleMouseUp);

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Show content after 3 seconds even without interaction
    const contentTimer = setTimeout(() => setShowContent(true), 3000);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchstart', handleMouseDown);
      canvas.removeEventListener('touchend', handleMouseUp);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      clearTimeout(contentTimer);
    };
  }, [animate, spawnParticle]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#030014]">
      {/* Interactive Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 cursor-none"
        style={{ touchAction: 'none' }}
      />
      
      {/* Hint text */}
      <AnimatePresence>
        {!showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-32 left-1/2 -translate-x-1/2 text-gray-500 text-sm pointer-events-none"
          >
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Move your cursor to attract particles • Click to create bursts • Merge symbols to form equations
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - Emerges from chaos */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4"
          >
            {/* Glass card for content */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative px-8 md:px-16 py-12 md:py-14 pointer-events-auto max-w-2xl mx-auto"
              style={{
                background: 'rgba(3, 0, 20, 0.75)',
                backdropFilter: 'blur(24px)',
                borderRadius: '32px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* Name */}
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-4xl sm:text-5xl md:text-7xl font-bold text-center mb-6"
              >
                <span className="text-white">Gaurav</span>
                <span className="bg-gradient-to-r from-[#00f0ff] via-[#7c3aed] to-[#f59e0b] bg-clip-text text-transparent"> Pande</span>
              </motion.h1>

              {/* Role */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-lg sm:text-xl md:text-2xl text-gray-300 text-center mb-6"
              >
                Software Engineer @ Microsoft Azure
              </motion.p>

              {/* Tagline */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="text-gray-500 text-center max-w-md mx-auto mb-10 leading-relaxed"
              >
                Building intelligent systems • ML enthusiast • Georgia Tech grad
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <Link href="/about">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 240, 255, 0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3.5 bg-gradient-to-r from-[#00f0ff] to-[#7c3aed] text-black font-semibold rounded-full text-sm sm:text-base"
                  >
                    Explore My Work
                  </motion.button>
                </Link>
                <Link href="/ai-lab">
                  <motion.button
                    whileHover={{ scale: 1.05, borderColor: '#00f0ff' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3.5 bg-transparent border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/5 transition-colors text-sm sm:text-base"
                  >
                    Try AI Lab
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Interaction counter */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-10 text-gray-600 text-sm tracking-wide"
            >
              {interactionCount > 0 && `✨ ${interactionCount} equations created`}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom cursor glow effect */}
      <motion.div 
        className="fixed pointer-events-none z-50"
        animate={{
          left: cursorPos.x - 20,
          top: cursorPos.y - 20,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        style={{
          width: 40,
          height: 40,
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.6) 0%, rgba(124, 58, 237, 0.3) 40%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(2px)',
        }}
      />
    </div>
  );
}
