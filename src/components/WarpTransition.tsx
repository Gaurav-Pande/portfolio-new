'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface WarpTransitionProps {
  onComplete: () => void;
}

export default function WarpTransition({ onComplete }: WarpTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Single unified animation
    const totalDuration = 80;
    let frame = 0;

    // Create streaks that will be used throughout
    interface Streak {
      angle: number;
      distance: number;
      speed: number;
      hue: number;
      size: number;
    }

    const streaks: Streak[] = [];
    for (let i = 0; i < 400; i++) {
      streaks.push({
        angle: Math.random() * Math.PI * 2,
        distance: 50 + Math.random() * Math.max(canvas.width, canvas.height),
        speed: 0.5 + Math.random() * 2,
        hue: 15 + Math.random() * 45,
        size: 1 + Math.random() * 2,
      });
    }

    const animate = () => {
      frame++;
      const progress = frame / totalDuration;
      
      // Smooth easing - slow start, fast middle, slow end
      const easeProgress = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      // Clear with trail effect that increases
      const trailAlpha = 0.1 + easeProgress * 0.2;
      ctx.fillStyle = `rgba(3, 0, 20, ${trailAlpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Black hole grows and eventually fills screen
      const baseRadius = Math.min(canvas.width, canvas.height) * 0.08;
      const maxRadius = Math.max(canvas.width, canvas.height) * 1.2;
      const blackHoleRadius = baseRadius + (maxRadius - baseRadius) * Math.pow(easeProgress, 1.2);

      // Warp speed increases exponentially
      const warpSpeed = Math.pow(easeProgress, 2) * 50;

      // Draw streaking stars/light
      streaks.forEach(streak => {
        // Calculate position moving outward from center
        const currentDist = streak.distance + warpSpeed * streak.speed * frame * 0.5;
        const wrappedDist = (currentDist % (Math.max(canvas.width, canvas.height) * 0.8)) + blackHoleRadius * 1.2;
        
        const x = centerX + Math.cos(streak.angle) * wrappedDist;
        const y = centerY + Math.sin(streak.angle) * wrappedDist;
        
        // Streak length increases with speed
        const streakLength = warpSpeed * streak.speed * 0.8;
        const prevX = centerX + Math.cos(streak.angle) * (wrappedDist - streakLength);
        const prevY = centerY + Math.sin(streak.angle) * (wrappedDist - streakLength);

        // Only draw if outside black hole
        if (wrappedDist > blackHoleRadius) {
          const alpha = Math.min(1, easeProgress * 2) * (1 - Math.pow(progress, 3));
          
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(x, y);
          
          const gradient = ctx.createLinearGradient(prevX, prevY, x, y);
          gradient.addColorStop(0, `hsla(${streak.hue}, 100%, 70%, 0)`);
          gradient.addColorStop(1, `hsla(${streak.hue}, 100%, 85%, ${alpha})`);
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = streak.size * (1 + easeProgress * 2);
          ctx.lineCap = 'round';
          ctx.stroke();
        }
      });

      // Glowing ring around black hole
      if (progress < 0.8) {
        const ringAlpha = (1 - progress / 0.8) * 0.7;
        const ringRadius = blackHoleRadius * 1.02;
        
        const ringGradient = ctx.createRadialGradient(
          centerX, centerY, ringRadius - 5,
          centerX, centerY, ringRadius + 15
        );
        ringGradient.addColorStop(0, 'transparent');
        ringGradient.addColorStop(0.4, `rgba(255, 150, 50, ${ringAlpha})`);
        ringGradient.addColorStop(0.6, `rgba(255, 200, 100, ${ringAlpha * 0.8})`);
        ringGradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = ringGradient;
        ctx.lineWidth = 20;
        ctx.stroke();
      }

      // Black hole (event horizon) - always on top
      const bhGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, blackHoleRadius
      );
      bhGradient.addColorStop(0, '#000000');
      bhGradient.addColorStop(0.8, '#000000');
      bhGradient.addColorStop(1, '#030014');

      ctx.beginPath();
      ctx.arc(centerX, centerY, blackHoleRadius, 0, Math.PI * 2);
      ctx.fillStyle = bhGradient;
      ctx.fill();

      // Fade to black at the end
      if (progress > 0.7) {
        const fadeAlpha = (progress - 0.7) / 0.3;
        ctx.fillStyle = `rgba(0, 0, 0, ${fadeAlpha})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      if (frame < totalDuration) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-black"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  );
}
