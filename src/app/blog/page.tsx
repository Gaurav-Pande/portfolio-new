'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// Sample blog posts - will be replaced with MDX content later
const BLOG_POSTS = [
  {
    slug: 'getting-started-with-omscs',
    title: 'Getting Started with Georgia Tech OMSCS',
    excerpt: 'A comprehensive guide for new OMSCS students. From application to graduation - everything you need to know about the program.',
    date: '2018-08-30',
    readTime: '12 min read',
    category: 'Georgia-Tech',
    tags: ['OMSCS', 'Education', 'Career'],
    featured: true,
  },
  {
    slug: 'qualia-consciousness',
    title: 'Qualia and the Hard Problem of Consciousness',
    excerpt: 'Exploring the philosophical implications of subjective experience and what it means for artificial intelligence.',
    date: '2018-03-24',
    readTime: '8 min read',
    category: 'Epiphany',
    tags: ['Philosophy', 'AI', 'Consciousness'],
    featured: true,
  },
  {
    slug: 'interview-preparation',
    title: 'Cracking the Coding Interview: My Journey',
    excerpt: 'Tips and strategies for technical interviews based on my experience with FAANG companies.',
    date: '2017-01-13',
    readTime: '15 min read',
    category: 'Programming',
    tags: ['Interview', 'Career', 'Algorithms'],
    featured: true,
  },
  {
    slug: 'bing-search-architecture',
    title: 'Understanding Bing Search Architecture',
    excerpt: 'A deep dive into how large-scale search engines work and the distributed systems behind them.',
    date: '2016-12-21',
    readTime: '10 min read',
    category: 'Programming',
    tags: ['Systems', 'Search', 'Distributed'],
    featured: false,
  },
  {
    slug: 'jenkins-ci-cd',
    title: 'Setting Up Jenkins for CI/CD',
    excerpt: 'A practical guide to setting up continuous integration and deployment pipelines with Jenkins.',
    date: '2016-10-21',
    readTime: '7 min read',
    category: 'Programming',
    tags: ['DevOps', 'CI/CD', 'Jenkins'],
    featured: false,
  },
  {
    slug: 'science-vs-religion',
    title: 'Science and Religion: A Balanced View',
    excerpt: 'Exploring the intersection of scientific inquiry and spiritual beliefs in the modern world.',
    date: '2016-03-20',
    readTime: '6 min read',
    category: 'Epiphany',
    tags: ['Philosophy', 'Science', 'Thoughts'],
    featured: false,
  },
];

const CATEGORIES = ['All', 'Programming', 'Georgia-Tech', 'Epiphany', 'Machine Learning'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Thoughts on software engineering, machine learning, career growth, and life.
            Technical tutorials, insights, and lessons learned along the way.
          </p>
        </motion.section>

        {/* Search and Filter */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          {/* Search Bar */}
          <div className="relative mb-6 max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent)]/50 transition-colors"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[var(--accent)] text-black'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-[var(--accent)]">★</span> Featured Articles
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <motion.article
                  key={post.slug}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="glass rounded-xl p-6 h-full hover:border-[var(--accent)]/30 transition-all duration-300">
                      {/* Category Badge */}
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-[var(--accent)]/10 text-[var(--accent)] rounded-full mb-4">
                        {post.category}
                      </span>
                      
                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-gray-500 text-sm">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(post.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {post.readTime}
                          </span>
                        </div>
                        <ArrowRight 
                          size={16} 
                          className="text-gray-500 group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all" 
                        />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

        {/* All Posts */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6">
            All Articles
          </motion.h2>
          
          <div className="space-y-4">
            {regularPosts.map((post) => (
              <motion.article
                key={post.slug}
                variants={itemVariants}
                whileHover={{ x: 8 }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="glass rounded-xl p-6 hover:border-white/20 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-medium text-[var(--accent-secondary)]">
                            {post.category}
                          </span>
                          <span className="text-gray-600">•</span>
                          <span className="text-gray-500 text-sm flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(post.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-[var(--accent)] transition-colors mb-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-500 text-sm whitespace-nowrap">
                          {post.readTime}
                        </span>
                        <ArrowRight 
                          size={16} 
                          className="text-gray-500 group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all" 
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
            </motion.div>
          )}
        </motion.section>

        {/* Newsletter CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="gradient-border p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-3">Subscribe to my Newsletter</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Get notified when I publish new articles. No spam, unsubscribe anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent)]/50"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-[var(--accent)] text-black font-medium rounded-lg hover:bg-[var(--accent)]/90 transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
