'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Code, Users, Compass } from 'lucide-react';
import FloatingSymbols from './FloatingSymbols';
import Typewriter from './Typewriter';

const ROLES = [
  'Software Engineer @ Microsoft Azure',
  'Machine Learning Enthusiast',
  'Georgia Tech Grad',
  'Open Source Contributor',
  'Builder of Things'
];

const PATHS = [
  {
    title: 'I am an engineer',
    subtitle: 'Explore my technical blog & projects',
    href: '/blog',
    icon: Code,
    color: 'var(--accent)',
  },
  {
    title: 'I am a recruiter',
    subtitle: 'View my experience & portfolio',
    href: '/about',
    icon: Users,
    color: 'var(--accent-secondary)',
  },
  {
    title: 'I am a wanderer',
    subtitle: 'Try my AI experiments',
    href: '/ai-lab',
    icon: Compass,
    color: 'var(--accent-tertiary)',
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      <FloatingSymbols />
      
      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-gray-400 text-lg md:text-xl mb-4"
        >
          Hello, World! 👋
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          <span className="text-white">Gaurav </span>
          <span className="gradient-text">Pande</span>
        </motion.h1>

        {/* Animated role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 h-10"
        >
          <Typewriter texts={ROLES} speed={80} deleteSpeed={40} pauseDuration={2500} />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mb-12"
        >
          Building intelligent systems at scale. Passionate about ML, distributed systems, 
          and open source. I love solving complex problems and sharing what I learn.
        </motion.p>

        {/* Who are you? Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mb-8"
        >
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-6">
            Who are you?
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {PATHS.map((path, index) => (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
              >
                <Link href={path.href}>
                  <motion.div
                    whileHover={{ 
                      scale: 1.02, 
                      y: -4,
                      boxShadow: `0 20px 40px -15px ${path.color}40`
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative flex items-center gap-3 px-6 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all duration-300 cursor-pointer"
                  >
                    <path.icon 
                      size={24} 
                      className="transition-colors duration-300"
                      style={{ color: path.color }}
                    />
                    <div className="text-left">
                      <p className="text-white font-medium text-sm md:text-base">
                        {path.title}
                      </p>
                      <p className="text-gray-500 text-xs hidden md:block">
                        {path.subtitle}
                      </p>
                    </div>
                    <ArrowRight 
                      size={16} 
                      className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      style={{ color: path.color }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-3 bg-[var(--accent)] rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
