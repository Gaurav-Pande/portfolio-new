'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'AI Lab', href: '/ai-lab' },
  { name: 'Resources', href: '/resources' },
];

const SOCIAL_LINKS = [
  { icon: Github, href: 'https://github.com/Gaurav-Pande', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/gpande2/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:gpande@gatech.edu', label: 'Email' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#030014]/80 backdrop-blur-lg border-b border-white/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-xl md:text-2xl font-bold"
              >
                <span className="text-white">Gaurav</span>
                <span className="text-[var(--accent)]">.</span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Social Links (Desktop) */}
            <div className="hidden md:flex items-center space-x-3">
              {SOCIAL_LINKS.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-400 hover:text-[var(--accent)] transition-colors"
                  aria-label={link.label}
                >
                  <link.icon size={20} />
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-72 bg-[#030014] border-l border-white/10 p-6 pt-20"
            >
              <div className="flex flex-col space-y-4">
                {NAV_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-lg font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Social Links */}
              <div className="absolute bottom-8 left-6 right-6">
                <div className="flex justify-center space-x-6 pt-6 border-t border-white/10">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-[var(--accent)] transition-colors"
                      aria-label={link.label}
                    >
                      <link.icon size={24} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
