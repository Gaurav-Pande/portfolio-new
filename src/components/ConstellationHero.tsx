'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// 12 Real constellations with relative positions (0-1 range)
const CONSTELLATIONS = [
  {
    name: 'Orion',
    stars: [
      { x: 0.48, y: 0.18 },  // Betelgeuse
      { x: 0.56, y: 0.18 },  // Bellatrix  
      { x: 0.50, y: 0.28 },  // Shoulder
      { x: 0.54, y: 0.28 },  // Shoulder
      { x: 0.52, y: 0.35 },  // Belt center
      { x: 0.49, y: 0.36 },  // Belt left
      { x: 0.55, y: 0.34 },  // Belt right
      { x: 0.46, y: 0.48 },  // Saiph
      { x: 0.58, y: 0.48 },  // Rigel
    ],
    connections: [[0,2], [1,3], [2,3], [2,4], [3,6], [4,5], [5,6], [4,7], [6,8]],
  },
  {
    name: 'Ursa Major',
    stars: [
      { x: 0.08, y: 0.12 },
      { x: 0.12, y: 0.10 },
      { x: 0.16, y: 0.11 },
      { x: 0.20, y: 0.14 },
      { x: 0.19, y: 0.18 },
      { x: 0.24, y: 0.15 },
      { x: 0.25, y: 0.19 },
    ],
    connections: [[0,1], [1,2], [2,3], [3,4], [4,6], [3,5], [5,6]],
  },
  {
    name: 'Cassiopeia',
    stars: [
      { x: 0.75, y: 0.08 },
      { x: 0.78, y: 0.12 },
      { x: 0.82, y: 0.09 },
      { x: 0.86, y: 0.13 },
      { x: 0.89, y: 0.10 },
    ],
    connections: [[0,1], [1,2], [2,3], [3,4]],
  },
  {
    name: 'Leo',
    stars: [
      { x: 0.82, y: 0.72 },
      { x: 0.86, y: 0.68 },
      { x: 0.90, y: 0.70 },
      { x: 0.94, y: 0.74 },
      { x: 0.88, y: 0.78 },
      { x: 0.84, y: 0.80 },
    ],
    connections: [[0,1], [1,2], [2,3], [2,4], [4,5], [5,0]],
  },
  {
    name: 'Cygnus',
    stars: [
      { x: 0.05, y: 0.52 },
      { x: 0.08, y: 0.58 },
      { x: 0.11, y: 0.63 },
      { x: 0.06, y: 0.63 },
      { x: 0.12, y: 0.56 },
      { x: 0.14, y: 0.68 },
    ],
    connections: [[0,1], [1,2], [1,3], [1,4], [2,5]],
  },
  {
    name: 'Lyra',
    stars: [
      { x: 0.92, y: 0.42 },
      { x: 0.95, y: 0.46 },
      { x: 0.97, y: 0.50 },
      { x: 0.95, y: 0.53 },
      { x: 0.93, y: 0.50 },
    ],
    connections: [[0,1], [1,2], [2,3], [3,4], [4,1]],
  },
  {
    name: 'Scorpius',
    stars: [
      { x: 0.08, y: 0.78 },
      { x: 0.11, y: 0.82 },
      { x: 0.14, y: 0.85 },
      { x: 0.18, y: 0.87 },
      { x: 0.22, y: 0.88 },
      { x: 0.25, y: 0.85 },
      { x: 0.27, y: 0.82 },
    ],
    connections: [[0,1], [1,2], [2,3], [3,4], [4,5], [5,6]],
  },
  {
    name: 'Gemini',
    stars: [
      { x: 0.32, y: 0.08 },
      { x: 0.35, y: 0.12 },
      { x: 0.38, y: 0.16 },
      { x: 0.36, y: 0.10 },
      { x: 0.40, y: 0.14 },
      { x: 0.42, y: 0.18 },
    ],
    connections: [[0,1], [1,2], [3,4], [4,5], [1,4]],
  },
  {
    name: 'Aquarius',
    stars: [
      { x: 0.62, y: 0.75 },
      { x: 0.65, y: 0.78 },
      { x: 0.68, y: 0.80 },
      { x: 0.66, y: 0.83 },
      { x: 0.70, y: 0.85 },
    ],
    connections: [[0,1], [1,2], [2,3], [3,4]],
  },
  {
    name: 'Draco',
    stars: [
      { x: 0.40, y: 0.65 },
      { x: 0.38, y: 0.70 },
      { x: 0.35, y: 0.74 },
      { x: 0.32, y: 0.78 },
      { x: 0.28, y: 0.75 },
    ],
    connections: [[0,1], [1,2], [2,3], [3,4]],
  },
  {
    name: 'Perseus',
    stars: [
      { x: 0.55, y: 0.08 },
      { x: 0.58, y: 0.11 },
      { x: 0.60, y: 0.15 },
      { x: 0.57, y: 0.14 },
      { x: 0.54, y: 0.12 },
    ],
    connections: [[0,1], [1,2], [1,3], [0,4]],
  },
  {
    name: 'Aries',
    stars: [
      { x: 0.70, y: 0.55 },
      { x: 0.73, y: 0.58 },
      { x: 0.77, y: 0.56 },
      { x: 0.80, y: 0.58 },
    ],
    connections: [[0,1], [1,2], [2,3]],
  },
];

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  currentOpacity: number;
  isConstellation: boolean;
  constellationIndex: number;
  starIndex: number;
  activated: boolean;
  glowIntensity: number;
  twinklePhase: number;
  twinkleSpeed: number;
}

interface CompletedConstellation {
  name: string;
  x: number;
  y: number;
  timestamp: number;
}

const CURSOR_RADIUS = 70;
const BACKGROUND_STAR_COUNT = 80;
const CONSTELLATION_RESET_DELAY = 3000; // Reset constellation after 3 seconds

export default function ConstellationHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number | undefined>(undefined);
  const completedTimestampsRef = useRef<Map<number, number>>(new Map());
  const timeRef = useRef(0);
  
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [completedConstellations, setCompletedConstellations] = useState<CompletedConstellation[]>([]);
  const [totalDiscovered, setTotalDiscovered] = useState(0);

  // Initialize stars
  const initStars = useCallback((width: number, height: number) => {
    const stars: Star[] = [];
    
    // Add constellation stars
    CONSTELLATIONS.forEach((constellation, cIndex) => {
      constellation.stars.forEach((pos, sIndex) => {
        stars.push({
          x: pos.x * width,
          y: pos.y * height,
          size: 2 + Math.random() * 1.5,
          baseOpacity: 0.35,
          currentOpacity: 0.35,
          isConstellation: true,
          constellationIndex: cIndex,
          starIndex: sIndex,
          activated: false,
          glowIntensity: 0,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.02 + Math.random() * 0.03,
        });
      });
    });
    
    // Add background twinkling stars
    for (let i = 0; i < BACKGROUND_STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.2 + 0.3,
        baseOpacity: Math.random() * 0.25 + 0.1,
        currentOpacity: 0.1,
        isConstellation: false,
        constellationIndex: -1,
        starIndex: -1,
        activated: false,
        glowIntensity: 0,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.01 + Math.random() * 0.04,
      });
    }
    
    starsRef.current = stars;
    completedTimestampsRef.current = new Map();
  }, []);

  // Check if constellation is complete
  const checkConstellationComplete = useCallback((constellationIndex: number, stars: Star[]) => {
    const constellationStars = stars.filter(
      s => s.isConstellation && s.constellationIndex === constellationIndex
    );
    return constellationStars.every(s => s.activated);
  }, []);

  // Reset a constellation
  const resetConstellation = useCallback((constellationIndex: number) => {
    const stars = starsRef.current;
    for (const star of stars) {
      if (star.isConstellation && star.constellationIndex === constellationIndex) {
        star.activated = false;
        star.glowIntensity = 0;
      }
    }
    completedTimestampsRef.current.delete(constellationIndex);
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    timeRef.current += 1;
    const time = timeRef.current;

    ctx.fillStyle = '#030014';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const mouse = mouseRef.current;
    const stars = starsRef.current;
    const newlyCompleted: CompletedConstellation[] = [];
    const now = Date.now();

    // Check for constellations that need to be reset
    completedTimestampsRef.current.forEach((timestamp, constellationIndex) => {
      if (now - timestamp > CONSTELLATION_RESET_DELAY) {
        resetConstellation(constellationIndex);
      }
    });

    // Update star states
    for (const star of stars) {
      const dx = star.x - mouse.x;
      const dy = star.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Twinkle effect for all stars
      star.twinklePhase += star.twinkleSpeed;
      const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7; // 0.4 to 1.0 range
      
      if (dist < CURSOR_RADIUS) {
        const proximity = 1 - dist / CURSOR_RADIUS;
        
        if (star.isConstellation) {
          // Activate constellation star
          if (!star.activated) {
            star.activated = true;
            
            // Check if constellation is complete
            if (checkConstellationComplete(star.constellationIndex, stars)) {
              const constellation = CONSTELLATIONS[star.constellationIndex];
              const constellationStars = stars.filter(
                s => s.constellationIndex === star.constellationIndex
              );
              const centerX = constellationStars.reduce((sum, s) => sum + s.x, 0) / constellationStars.length;
              const centerY = constellationStars.reduce((sum, s) => sum + s.y, 0) / constellationStars.length;
              
              // Mark completion time for reset
              completedTimestampsRef.current.set(star.constellationIndex, now);
              
              newlyCompleted.push({
                name: constellation.name,
                x: centerX,
                y: centerY,
                timestamp: now,
              });
            }
          }
          star.currentOpacity = 0.95;
          star.glowIntensity = Math.min(star.glowIntensity + 0.2, 1);
        } else {
          star.currentOpacity = (star.baseOpacity + proximity * 0.5) * twinkle;
        }
      } else {
        // Apply twinkling when not near cursor
        if (star.isConstellation && star.activated) {
          star.currentOpacity = 0.75 * twinkle;
          star.glowIntensity = Math.max(star.glowIntensity - 0.015, 0.4);
        } else if (star.isConstellation) {
          star.currentOpacity = star.baseOpacity * twinkle;
          star.glowIntensity = Math.max(star.glowIntensity - 0.03, 0);
        } else {
          // Background stars twinkle
          star.currentOpacity = star.baseOpacity * twinkle;
        }
      }
    }

    // Handle newly completed constellations
    if (newlyCompleted.length > 0) {
      setCompletedConstellations(prev => [...prev, ...newlyCompleted]);
      setTotalDiscovered(prev => prev + newlyCompleted.length);
    }

    // Draw constellation connections
    CONSTELLATIONS.forEach((constellation, cIndex) => {
      const constellationStars = stars.filter(
        s => s.isConstellation && s.constellationIndex === cIndex
      );
      
      constellation.connections.forEach(([i, j]) => {
        const star1 = constellationStars[i];
        const star2 = constellationStars[j];
        
        if (!star1 || !star2) return;
        
        // Only draw line if both stars are activated
        if (star1.activated && star2.activated) {
          const glowIntensity = Math.min(star1.glowIntensity, star2.glowIntensity);
          
          // Outer glow
          ctx.beginPath();
          ctx.moveTo(star1.x, star1.y);
          ctx.lineTo(star2.x, star2.y);
          ctx.strokeStyle = `rgba(100, 180, 255, ${0.15 + glowIntensity * 0.2})`;
          ctx.lineWidth = 5;
          ctx.lineCap = 'round';
          ctx.stroke();
          
          // Middle glow
          ctx.beginPath();
          ctx.moveTo(star1.x, star1.y);
          ctx.lineTo(star2.x, star2.y);
          ctx.strokeStyle = `rgba(140, 200, 255, ${0.35 + glowIntensity * 0.3})`;
          ctx.lineWidth = 2.5;
          ctx.stroke();
          
          // Core line
          ctx.beginPath();
          ctx.moveTo(star1.x, star1.y);
          ctx.lineTo(star2.x, star2.y);
          ctx.strokeStyle = `rgba(220, 240, 255, ${0.7 + glowIntensity * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (star1.activated || star2.activated) {
          // Faint dashed line for partial progress
          ctx.beginPath();
          ctx.moveTo(star1.x, star1.y);
          ctx.lineTo(star2.x, star2.y);
          ctx.strokeStyle = 'rgba(100, 150, 200, 0.12)';
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 5]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });
    });

    // Draw all stars with twinkle effect
    for (const star of stars) {
      // Glow for constellation stars
      if (star.isConstellation && star.glowIntensity > 0) {
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.size * 10
        );
        gradient.addColorStop(0, `rgba(100, 180, 255, ${star.glowIntensity * 0.5})`);
        gradient.addColorStop(0.4, `rgba(100, 180, 255, ${star.glowIntensity * 0.15})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 10, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      // Star sparkle rays (cross pattern) for bright stars
      if (star.currentOpacity > 0.5) {
        const rayLength = star.size * 4 * star.currentOpacity;
        const rayOpacity = (star.currentOpacity - 0.5) * 0.4;
        
        ctx.beginPath();
        ctx.moveTo(star.x - rayLength, star.y);
        ctx.lineTo(star.x + rayLength, star.y);
        ctx.strokeStyle = `rgba(200, 230, 255, ${rayOpacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(star.x, star.y - rayLength);
        ctx.lineTo(star.x, star.y + rayLength);
        ctx.stroke();
      }
      
      // Star core
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      
      if (star.isConstellation) {
        const brightness = star.activated ? 255 : 200;
        ctx.fillStyle = `rgba(${brightness}, ${brightness}, 255, ${star.currentOpacity})`;
      } else {
        // Slight color variation for background stars
        const hue = 200 + Math.sin(star.twinklePhase * 0.5) * 20;
        ctx.fillStyle = `rgba(${180 + hue * 0.2}, ${210 + hue * 0.1}, 255, ${star.currentOpacity})`;
      }
      ctx.fill();
      
      // Bright center for activated constellation stars
      if (star.isConstellation && star.activated) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.9})`;
        ctx.fill();
      }
    }

    // Draw subtle cursor area
    if (mouse.x > 0 && mouse.y > 0) {
      const gradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, CURSOR_RADIUS
      );
      gradient.addColorStop(0, 'rgba(100, 180, 255, 0.02)');
      gradient.addColorStop(1, 'transparent');
      
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, CURSOR_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [checkConstellationComplete, resetConstellation]);

  // Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const handleResize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      initStars(canvas.width, canvas.height);
      setCompletedConstellations([]);
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

    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseRef.current.x = touch.clientX - rect.left;
      mouseRef.current.y = touch.clientY - rect.top;
      setCursorPos({ x: touch.clientX, y: touch.clientY });
    };

    handleResize();
    
    window.addEventListener('resize', handleResize);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleMouseLeave);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleMouseLeave);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animate, initStars]);

  // Clean up old constellation labels
  useEffect(() => {
    const interval = setInterval(() => {
      setCompletedConstellations(prev => 
        prev.filter(c => Date.now() - c.timestamp < 2500)
      );
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#030014] cursor-default">
      {/* Interactive Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none"
      />

      {/* Constellation Names */}
      <AnimatePresence>
        {completedConstellations.map((constellation) => (
          <motion.div
            key={`${constellation.name}-${constellation.timestamp}`}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.4 }}
            className="absolute pointer-events-none z-20"
            style={{
              left: constellation.x,
              top: constellation.y - 25,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="text-center">
              <motion.span 
                className="text-[10px] tracking-[0.25em] uppercase text-cyan-300/90 font-light"
                initial={{ letterSpacing: '0.1em' }}
                animate={{ letterSpacing: '0.25em' }}
                transition={{ duration: 0.3 }}
              >
                {constellation.name}
              </motion.span>
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent mt-1"
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Discovered counter */}
      {totalDiscovered > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-6 right-6 z-20 pointer-events-none"
        >
          <div className="text-xs text-cyan-400/50 tracking-wider">
            <span className="text-cyan-300/80">{totalDiscovered}</span>
            <span className="text-gray-600"> constellations found</span>
          </div>
        </motion.div>
      )}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-3xl"
        >
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl sm:text-6xl md:text-8xl font-bold mb-8 tracking-tight"
          >
            <span className="text-white">Gaurav</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300"> Pande</span>
          </motion.h1>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-6 font-light"
          >
            Software Engineer @ Microsoft Azure
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-gray-500 mb-14 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
          >
            Building intelligent systems at scale. Passionate about ML, 
            distributed systems, and open source.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 pointer-events-auto"
          >
            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.95)' }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 bg-white text-gray-900 font-medium rounded-lg text-base transition-all"
              >
                View My Work
              </motion.button>
            </Link>
            <Link href="/ai-lab">
              <motion.button
                whileHover={{ scale: 1.02, borderColor: 'rgba(100,180,255,0.5)' }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 bg-transparent border border-gray-700 text-gray-300 font-medium rounded-lg text-base hover:text-white transition-all"
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
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-10 text-gray-600 text-xs tracking-[0.2em] uppercase"
        >
          <motion.span
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Find the hidden constellations
          </motion.span>
        </motion.div>
      </div>

      {/* Cursor glow */}
      <motion.div 
        className="fixed pointer-events-none z-50 rounded-full mix-blend-screen"
        animate={{
          x: cursorPos.x - 8,
          y: cursorPos.y - 8,
        }}
        transition={{ type: 'spring', damping: 50, stiffness: 500 }}
        style={{
          width: 16,
          height: 16,
          background: 'radial-gradient(circle, rgba(100, 180, 255, 0.5) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
