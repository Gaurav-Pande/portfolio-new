'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

const PARTICLE_COUNT = 25;
const CURSOR_RADIUS = 150;
const PUSH_STRENGTH = 0.5;

export default function InteractiveHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number | undefined>(undefined);
  
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  // Initialize particles
  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }
    particlesRef.current = particles;
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Clear canvas
    ctx.fillStyle = '#030014';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const mouse = mouseRef.current;
    const particles = particlesRef.current;

    // Update and draw particles
    for (const p of particles) {
      // Calculate distance to cursor
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Gentle push away from cursor
      if (dist < CURSOR_RADIUS && dist > 0) {
        const force = (CURSOR_RADIUS - dist) / CURSOR_RADIUS * PUSH_STRENGTH;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }

      // Apply velocity with strong damping
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.98;
      p.vy *= 0.98;

      // Add very subtle drift
      p.vx += (Math.random() - 0.5) * 0.02;
      p.vy += (Math.random() - 0.5) * 0.02;

      // Wrap around edges
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = canvas.height + 10;
      if (p.y > canvas.height + 10) p.y = -10;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(100, 200, 255, ${p.opacity})`;
      ctx.fill();
    }

    // Draw subtle connection lines between nearby particles
    ctx.strokeStyle = 'rgba(100, 200, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 120) {
          ctx.globalAlpha = (1 - dist / 120) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;

    // Subtle cursor glow
    if (mouse.x > 0 && mouse.y > 0) {
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 100);
      gradient.addColorStop(0, 'rgba(100, 200, 255, 0.03)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2);
      ctx.fill();
    }

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  // Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const handleResize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      if (particlesRef.current.length === 0) {
        initParticles(canvas.width, canvas.height);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    handleResize();
    
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animate, initParticles]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#030014]">
      {/* Subtle gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(3, 0, 20, 0.4) 100%)',
        }}
      />

      {/* Interactive Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0"
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-2xl"
        >
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl sm:text-6xl md:text-8xl font-bold mb-6 tracking-tight"
          >
            <span className="text-white">Gaurav</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"> Pande</span>
          </motion.h1>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-4"
          >
            Software Engineer @ Microsoft Azure
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-gray-600 mb-12 text-sm sm:text-base"
          >
            Building intelligent systems • ML enthusiast • Georgia Tech grad
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 bg-white text-black font-medium rounded-lg text-sm sm:text-base hover:bg-gray-100 transition-colors"
              >
                View My Work
              </motion.button>
            </Link>
            <Link href="/ai-lab">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 bg-transparent border border-gray-700 text-white font-medium rounded-lg text-sm sm:text-base hover:bg-white/5 hover:border-gray-600 transition-colors"
              >
                Try AI Lab
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 text-gray-600 text-xs tracking-widest uppercase"
        >
          <motion.span
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Move cursor to interact
          </motion.span>
        </motion.div>
      </div>

      {/* Subtle cursor highlight */}
      <motion.div 
        className="fixed pointer-events-none z-50 rounded-full"
        animate={{
          x: cursorPos.x - 8,
          y: cursorPos.y - 8,
        }}
        transition={{ type: 'spring', damping: 50, stiffness: 400 }}
        style={{
          width: 16,
          height: 16,
          background: 'rgba(100, 200, 255, 0.5)',
          boxShadow: '0 0 20px rgba(100, 200, 255, 0.3)',
        }}
      />
    </div>
  );
}
