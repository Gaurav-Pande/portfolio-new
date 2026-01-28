'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

const FOOTER_LINKS = {
  'Navigate': [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'AI Lab', href: '/ai-lab' },
  ],
  'Resources': [
    { name: 'Courses', href: '/resources' },
    { name: 'Mentorship', href: '/resources#mentorship' },
    { name: 'Free Guides', href: '/resources#free' },
  ],
  'Connect': [
    { name: 'GitHub', href: 'https://github.com/Gaurav-Pande' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/gpande2/' },
    { name: 'Twitter', href: 'https://twitter.com/garvpande11235' },
    { name: 'Email', href: 'mailto:gpande@gatech.edu' },
  ],
};

const SOCIAL_LINKS = [
  { icon: Github, href: 'https://github.com/Gaurav-Pande' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/gpande2/' },
  { icon: Twitter, href: 'https://twitter.com/garvpande11235' },
  { icon: Mail, href: 'mailto:gpande@gatech.edu' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-white">Gaurav</span>
              <span className="text-2xl font-bold text-[var(--accent)]">.</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Software Engineer at Microsoft Azure. Building intelligent systems at scale.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2 text-gray-500 hover:text-[var(--accent)] transition-colors"
                >
                  <link.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Gaurav Pande. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Built with <Heart size={14} className="text-red-500" fill="currentColor" /> using Next.js & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
