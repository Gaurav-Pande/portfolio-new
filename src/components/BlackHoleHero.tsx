'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Constellation data for interactive stars
const CONSTELLATIONS = [
  {
    name: 'Ursa Major',
    stars: [
      { x: 0.05, y: 0.08 },
      { x: 0.08, y: 0.06 },
      { x: 0.11, y: 0.07 },
      { x: 0.14, y: 0.10 },
      { x: 0.13, y: 0.14 },
      { x: 0.17, y: 0.11 },
      { x: 0.18, y: 0.15 },
    ],
    connections: [[0,1], [1,2], [2,3], [3,4], [4,6], [3,5], [5,6]],
  },
  {
    name: 'Cassiopeia',
    stars: [
      { x: 0.88, y: 0.06 },
      { x: 0.91, y: 0.10 },
      { x: 0.94, y: 0.07 },
      { x: 0.97, y: 0.11 },
      { x: 0.99, y: 0.08 },
    ],
    connections: [[0,1], [1,2], [2,3], [3,4]],
  },
  {
    name: 'Leo',
    stars: [
      { x: 0.03, y: 0.85 },
      { x: 0.06, y: 0.82 },
      { x: 0.09, y: 0.84 },
      { x: 0.12, y: 0.88 },
      { x: 0.08, y: 0.90 },
    ],
    connections: [[0,1], [1,2], [2,3], [2,4], [4,0]],
  },
  {
    name: 'Lyra',
    stars: [
      { x: 0.92, y: 0.82 },
      { x: 0.94, y: 0.86 },
      { x: 0.96, y: 0.89 },
      { x: 0.95, y: 0.92 },
      { x: 0.93, y: 0.90 },
    ],
    connections: [[0,1], [1,2], [2,3], [3,4], [4,1]],
  },
];

interface DiskParticle {
  angle: number;
  radius: number;
  speed: number;
  brightness: number;
  streakLength: number;
  yOffset: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinklePhase: number;
  twinkleSpeed: number;
  isConstellation: boolean;
  constellationIndex: number;
  starIndex: number;
  activated: boolean;
}

interface CompletedConstellation {
  name: string;
  x: number;
  y: number;
  timestamp: number;
}

const DISK_PARTICLE_COUNT = 500;
const STAR_COUNT = 120;
const CURSOR_RADIUS = 60;

interface BlackHoleHeroProps {
  onBlackHoleClick?: () => void;
}

export default function BlackHoleHero({ onBlackHoleClick }: BlackHoleHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const diskParticlesRef = useRef<DiskParticle[]>([]);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const completedTimestampsRef = useRef<Map<number, number>>(new Map());
  const blackHoleCenterRef = useRef({ x: 0, y: 0, radius: 0 });
  
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [completedConstellations, setCompletedConstellations] = useState<CompletedConstellation[]>([]);
  const [isHoveringBlackHole, setIsHoveringBlackHole] = useState(false);

  // Initialize disk particles
  const initDiskParticles = useCallback(() => {
    const particles: DiskParticle[] = [];
    
    for (let i = 0; i < DISK_PARTICLE_COUNT; i++) {
      const radiusNorm = Math.random();
      particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: 0.15 + radiusNorm * 0.5, // Normalized radius (will be scaled)
        speed: (0.003 + Math.random() * 0.004) * (1 - radiusNorm * 0.5),
        brightness: 0.3 + Math.random() * 0.7,
        streakLength: 0.02 + Math.random() * 0.04,
        yOffset: (Math.random() - 0.5) * 0.03,
      });
    }
    
    diskParticlesRef.current = particles;
  }, []);

  // Initialize stars with constellations
  const initStars = useCallback((width: number, height: number) => {
    const stars: Star[] = [];
    
    // Add constellation stars
    CONSTELLATIONS.forEach((constellation, cIndex) => {
      constellation.stars.forEach((pos, sIndex) => {
        stars.push({
          x: pos.x * width,
          y: pos.y * height,
          size: 2 + Math.random() * 1,
          opacity: 0.5,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.02 + Math.random() * 0.02,
          isConstellation: true,
          constellationIndex: cIndex,
          starIndex: sIndex,
          activated: false,
        });
      });
    });
    
    // Add background stars (avoid center where black hole is)
    for (let i = 0; i < STAR_COUNT; i++) {
      let x, y;
      do {
        x = Math.random() * width;
        y = Math.random() * height;
      } while (
        Math.abs(x - width / 2) < width * 0.25 &&
        Math.abs(y - height / 2) < height * 0.2
      );
      
      stars.push({
        x,
        y,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.4 + 0.1,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.015 + Math.random() * 0.03,
        isConstellation: false,
        constellationIndex: -1,
        starIndex: -1,
        activated: false,
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

  // Reset constellation
  const resetConstellation = useCallback((constellationIndex: number) => {
    const stars = starsRef.current;
    for (const star of stars) {
      if (star.isConstellation && star.constellationIndex === constellationIndex) {
        star.activated = false;
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
    const now = Date.now();

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = Math.min(canvas.width, canvas.height);
    const blackHoleRadius = scale * 0.08;
    const diskWidth = scale * 0.55;
    const diskHeight = scale * 0.12;

    // Store black hole center for click detection
    blackHoleCenterRef.current = { x: centerX, y: centerY, radius: blackHoleRadius };

    // Clear
    ctx.fillStyle = '#030014';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Check for constellation resets
    completedTimestampsRef.current.forEach((timestamp, constellationIndex) => {
      if (now - timestamp > 3000) {
        resetConstellation(constellationIndex);
      }
    });

    // Update and draw stars
    const mouse = mouseRef.current;
    const newlyCompleted: CompletedConstellation[] = [];

    for (const star of starsRef.current) {
      star.twinklePhase += star.twinkleSpeed;
      const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7;
      
      // Check cursor proximity for constellation stars
      if (star.isConstellation) {
        const dx = star.x - mouse.x;
        const dy = star.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < CURSOR_RADIUS && !star.activated) {
          star.activated = true;
          
          if (checkConstellationComplete(star.constellationIndex, starsRef.current)) {
            const constellation = CONSTELLATIONS[star.constellationIndex];
            const constellationStars = starsRef.current.filter(
              s => s.constellationIndex === star.constellationIndex
            );
            const cx = constellationStars.reduce((sum, s) => sum + s.x, 0) / constellationStars.length;
            const cy = constellationStars.reduce((sum, s) => sum + s.y, 0) / constellationStars.length;
            
            completedTimestampsRef.current.set(star.constellationIndex, now);
            newlyCompleted.push({ name: constellation.name, x: cx, y: cy, timestamp: now });
          }
        }
      }
      
      const opacity = star.activated ? 0.9 : star.opacity * twinkle;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = star.isConstellation 
        ? `rgba(200, 220, 255, ${opacity})` 
        : `rgba(180, 200, 255, ${opacity})`;
      ctx.fill();
      
      // Glow for activated stars
      if (star.activated) {
        const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 6);
        glow.addColorStop(0, 'rgba(100, 180, 255, 0.4)');
        glow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 6, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }
    }

    // Draw constellation lines
    CONSTELLATIONS.forEach((constellation, cIndex) => {
      const constellationStars = starsRef.current.filter(
        s => s.isConstellation && s.constellationIndex === cIndex
      );
      
      constellation.connections.forEach(([i, j]) => {
        const star1 = constellationStars[i];
        const star2 = constellationStars[j];
        if (!star1 || !star2) return;
        
        if (star1.activated && star2.activated) {
          ctx.beginPath();
          ctx.moveTo(star1.x, star1.y);
          ctx.lineTo(star2.x, star2.y);
          ctx.strokeStyle = 'rgba(100, 180, 255, 0.5)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });
    });

    if (newlyCompleted.length > 0) {
      setCompletedConstellations(prev => [...prev, ...newlyCompleted]);
    }

    // === DRAW BLACK HOLE ===
    
    // Outer ambient glow
    const ambientGlow = ctx.createRadialGradient(
      centerX, centerY, blackHoleRadius * 1.5,
      centerX, centerY, diskWidth * 1.2
    );
    ambientGlow.addColorStop(0, 'rgba(255, 120, 50, 0.08)');
    ambientGlow.addColorStop(0.5, 'rgba(255, 80, 30, 0.03)');
    ambientGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = ambientGlow;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Back layer of disk (behind black hole)
    ctx.save();
    ctx.translate(centerX, centerY);
    
    for (const particle of diskParticlesRef.current) {
      particle.angle += particle.speed;
      
      const x = Math.cos(particle.angle) * particle.radius * diskWidth;
      const baseY = Math.sin(particle.angle) * particle.radius * diskHeight;
      const y = baseY + particle.yOffset * diskHeight;
      
      // Only back particles
      if (baseY > 0) {
        const distFromCenter = Math.sqrt(x * x + y * y);
        if (distFromCenter > blackHoleRadius * 0.9) {
          // Doppler shift - approaching side (left) is brighter/bluer
          const dopplerFactor = (-Math.cos(particle.angle) + 1) / 2;
          const hue = 25 + dopplerFactor * 20; // Orange to yellow
          const lightness = 45 + particle.brightness * 25 + dopplerFactor * 15;
          const alpha = particle.brightness * 0.4 * (1 - Math.abs(baseY) / (diskHeight * 0.8));
          
          // Draw streak
          const prevX = Math.cos(particle.angle - particle.streakLength) * particle.radius * diskWidth;
          const prevY = Math.sin(particle.angle - particle.streakLength) * particle.radius * diskHeight;
          
          const gradient = ctx.createLinearGradient(prevX, prevY, x, y);
          gradient.addColorStop(0, 'transparent');
          gradient.addColorStop(1, `hsla(${hue}, 100%, ${lightness}%, ${alpha})`);
          
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(x, y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2 + particle.brightness * 2;
          ctx.lineCap = 'round';
          ctx.stroke();
        }
      }
    }
    ctx.restore();

    // Gravitational lensing ring (top arc) - the bent light from back of disk
    ctx.save();
    ctx.translate(centerX, centerY);
    
    const lensRadius = blackHoleRadius * 1.15;
    
    // Multiple layers for the lensing arc
    for (let layer = 0; layer < 4; layer++) {
      const r = lensRadius + layer * 3;
      const alpha = (0.6 - layer * 0.12) * (Math.sin(time * 0.03) * 0.1 + 0.9);
      
      const arcGrad = ctx.createLinearGradient(-r * 1.2, 0, r * 1.2, 0);
      arcGrad.addColorStop(0, 'transparent');
      arcGrad.addColorStop(0.15, `rgba(255, 140, 60, ${alpha * 0.3})`);
      arcGrad.addColorStop(0.35, `rgba(255, 200, 120, ${alpha})`);
      arcGrad.addColorStop(0.5, `rgba(255, 240, 200, ${alpha})`);
      arcGrad.addColorStop(0.65, `rgba(255, 200, 120, ${alpha})`);
      arcGrad.addColorStop(0.85, `rgba(255, 140, 60, ${alpha * 0.3})`);
      arcGrad.addColorStop(1, 'transparent');
      
      ctx.beginPath();
      ctx.arc(0, 0, r, Math.PI * 1.08, Math.PI * 1.92);
      ctx.strokeStyle = arcGrad;
      ctx.lineWidth = 6 - layer;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
    
    // Bottom lensing arc (reflection/back of disk visible below)
    for (let layer = 0; layer < 3; layer++) {
      const r = lensRadius * 1.25 + layer * 4;
      const alpha = (0.35 - layer * 0.1) * (Math.sin(time * 0.03 + 1) * 0.1 + 0.9);
      
      const bottomGrad = ctx.createLinearGradient(-r * 1.2, 0, r * 1.2, 0);
      bottomGrad.addColorStop(0, 'transparent');
      bottomGrad.addColorStop(0.2, `rgba(200, 120, 80, ${alpha * 0.4})`);
      bottomGrad.addColorStop(0.5, `rgba(220, 160, 120, ${alpha})`);
      bottomGrad.addColorStop(0.8, `rgba(200, 120, 80, ${alpha * 0.4})`);
      bottomGrad.addColorStop(1, 'transparent');
      
      ctx.beginPath();
      ctx.arc(0, 0, r, Math.PI * 0.08, Math.PI * 0.92);
      ctx.strokeStyle = bottomGrad;
      ctx.lineWidth = 4 - layer;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
    
    ctx.restore();

    // Photon sphere / inner ring
    const photonRing = ctx.createRadialGradient(
      centerX, centerY, blackHoleRadius * 0.95,
      centerX, centerY, blackHoleRadius * 1.15
    );
    photonRing.addColorStop(0, 'rgba(0, 0, 0, 0)');
    photonRing.addColorStop(0.4, 'rgba(255, 180, 100, 0.2)');
    photonRing.addColorStop(0.6, 'rgba(255, 200, 150, 0.4)');
    photonRing.addColorStop(0.8, 'rgba(255, 180, 100, 0.2)');
    photonRing.addColorStop(1, 'transparent');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, blackHoleRadius * 1.15, 0, Math.PI * 2);
    ctx.fillStyle = photonRing;
    ctx.fill();

    // The black hole (event horizon)
    const eventHorizon = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, blackHoleRadius
    );
    eventHorizon.addColorStop(0, '#000000');
    eventHorizon.addColorStop(0.8, '#000000');
    eventHorizon.addColorStop(0.95, '#0a0508');
    eventHorizon.addColorStop(1, '#150a10');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, blackHoleRadius, 0, Math.PI * 2);
    ctx.fillStyle = eventHorizon;
    ctx.fill();

    // Front layer of disk (in front of black hole)
    ctx.save();
    ctx.translate(centerX, centerY);
    
    for (const particle of diskParticlesRef.current) {
      const x = Math.cos(particle.angle) * particle.radius * diskWidth;
      const baseY = Math.sin(particle.angle) * particle.radius * diskHeight;
      const y = baseY + particle.yOffset * diskHeight;
      
      // Only front particles
      if (baseY <= 0) {
        const distFromCenter = Math.sqrt(x * x + y * y);
        if (distFromCenter > blackHoleRadius * 0.7) {
          const dopplerFactor = (-Math.cos(particle.angle) + 1) / 2;
          const hue = 20 + dopplerFactor * 25;
          const lightness = 50 + particle.brightness * 30 + dopplerFactor * 20;
          const alpha = particle.brightness * 0.7;
          
          // Draw streak
          const prevX = Math.cos(particle.angle - particle.streakLength) * particle.radius * diskWidth;
          const prevY = Math.sin(particle.angle - particle.streakLength) * particle.radius * diskHeight;
          
          const gradient = ctx.createLinearGradient(prevX, prevY, x, y);
          gradient.addColorStop(0, `hsla(${hue}, 100%, ${lightness}%, ${alpha * 0.2})`);
          gradient.addColorStop(1, `hsla(${hue}, 100%, ${lightness}%, ${alpha})`);
          
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(x, y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2.5 + particle.brightness * 3;
          ctx.lineCap = 'round';
          ctx.stroke();
          
          // Glow
          ctx.beginPath();
          ctx.arc(x, y, 3 + particle.brightness * 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue}, 100%, ${lightness + 20}%, ${alpha * 0.3})`;
          ctx.fill();
        }
      }
    }
    ctx.restore();

    // Center glow pulse
    const pulseIntensity = Math.sin(time * 0.015) * 0.15 + 0.85;
    const centerGlow = ctx.createRadialGradient(
      centerX, centerY, blackHoleRadius * 0.5,
      centerX, centerY, blackHoleRadius * 2.5
    );
    centerGlow.addColorStop(0, `rgba(255, 140, 80, ${0.08 * pulseIntensity})`);
    centerGlow.addColorStop(0.5, `rgba(255, 100, 50, ${0.04 * pulseIntensity})`);
    centerGlow.addColorStop(1, 'transparent');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, blackHoleRadius * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = centerGlow;
    ctx.fill();

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
      initDiskParticles();
      initStars(canvas.width, canvas.height);
      setCompletedConstellations([]);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current.x = x;
      mouseRef.current.y = y;
      setCursorPos({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over black hole
      const bh = blackHoleCenterRef.current;
      const dist = Math.sqrt((x - bh.x) ** 2 + (y - bh.y) ** 2);
      setIsHoveringBlackHole(dist < bh.radius * 1.5);
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      setIsHoveringBlackHole(false);
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Check if clicked on black hole
      const bh = blackHoleCenterRef.current;
      const dist = Math.sqrt((x - bh.x) ** 2 + (y - bh.y) ** 2);
      if (dist < bh.radius * 1.5 && onBlackHoleClick) {
        onBlackHoleClick();
      }
    };

    handleResize();
    
    window.addEventListener('resize', handleResize);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('click', handleClick);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('click', handleClick);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animate, initDiskParticles, initStars, onBlackHoleClick]);

  // Clean up constellation labels
  useEffect(() => {
    const interval = setInterval(() => {
      setCompletedConstellations(prev => prev.filter(c => Date.now() - c.timestamp < 2500));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-screen overflow-hidden bg-[#030014] ${isHoveringBlackHole ? 'cursor-pointer' : ''}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Click hint when hovering black hole */}
      <AnimatePresence>
        {isHoveringBlackHole && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
          >
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-orange-400/80 text-sm font-medium tracking-wider uppercase"
              >
                About Me →
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Constellation Names */}
      <AnimatePresence>
        {completedConstellations.map((constellation) => (
          <motion.div
            key={`${constellation.name}-${constellation.timestamp}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="absolute pointer-events-none z-20"
            style={{ left: constellation.x, top: constellation.y - 20, transform: 'translateX(-50%)' }}
          >
            <span className="text-[10px] tracking-[0.25em] uppercase text-cyan-300/80 font-light">
              {constellation.name}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Content - Positioned above black hole */}
      <div className="absolute inset-x-0 top-[15%] z-10 px-6 pointer-events-none flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg sm:text-xl text-gray-400 mb-2 font-light"
          >
            Hi, I'm
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-3 tracking-tight"
          >
            <span className="text-white drop-shadow-[0_0_30px_rgba(255,150,80,0.3)]">Gaurav</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400"> Pande</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-gray-400 font-light"
          >
            Software Engineer @ Microsoft Azure
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-0 right-0 text-orange-300/40 text-xs tracking-[0.2em] uppercase text-center z-10 pointer-events-none"
      >
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div>Click the black hole to explore</div>
          <div className="mt-1 text-gray-600">or find the hidden constellations</div>
        </motion.div>
      </motion.div>

      {/* Cursor glow */}
      <motion.div 
        className="fixed pointer-events-none z-50 rounded-full mix-blend-screen"
        animate={{ x: cursorPos.x - 10, y: cursorPos.y - 10 }}
        transition={{ type: 'spring', damping: 50, stiffness: 500 }}
        style={{
          width: 20,
          height: 20,
          background: 'radial-gradient(circle, rgba(255, 180, 100, 0.4) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
