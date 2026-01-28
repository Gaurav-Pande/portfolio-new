'use client';

import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Video, 
  Calendar, 
  Download, 
  Star, 
  Users, 
  Zap,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Clock
} from 'lucide-react';
import Link from 'next/link';

const FREE_RESOURCES = [
  {
    title: 'OMSCS Survival Guide',
    description: 'Everything you need to know about Georgia Tech OMSCS program - from application to graduation.',
    type: 'PDF Guide',
    icon: BookOpen,
    downloadCount: '2.5k+',
    href: '#',
  },
  {
    title: 'System Design Cheat Sheet',
    description: 'Quick reference for system design interviews covering all major patterns and trade-offs.',
    type: 'PDF',
    icon: Download,
    downloadCount: '5k+',
    href: '#',
  },
  {
    title: 'ML Interview Questions',
    description: 'Curated list of 100+ machine learning interview questions with detailed answers.',
    type: 'PDF',
    icon: Download,
    downloadCount: '3k+',
    href: '#',
  },
];

const PREMIUM_COURSES = [
  {
    title: 'Complete System Design Masterclass',
    description: 'Learn to design scalable systems like a senior engineer. Covers distributed systems, databases, caching, and real-world case studies.',
    price: 79,
    originalPrice: 149,
    duration: '12 hours',
    lessons: 45,
    students: 850,
    rating: 4.9,
    tags: ['System Design', 'Interview Prep', 'Senior Level'],
    featured: true,
    href: '#',
  },
  {
    title: 'Machine Learning Engineering Path',
    description: 'From ML basics to production systems. Build end-to-end ML pipelines, deploy models, and implement MLOps best practices.',
    price: 99,
    originalPrice: 199,
    duration: '18 hours',
    lessons: 60,
    students: 620,
    rating: 4.8,
    tags: ['Machine Learning', 'MLOps', 'Production'],
    featured: true,
    href: '#',
  },
  {
    title: 'FAANG Interview Bootcamp',
    description: 'Comprehensive preparation for top tech company interviews. Algorithms, system design, and behavioral rounds covered.',
    price: 59,
    originalPrice: 99,
    duration: '8 hours',
    lessons: 30,
    students: 1200,
    rating: 4.9,
    tags: ['Interview Prep', 'Algorithms', 'FAANG'],
    featured: false,
    href: '#',
  },
];

const MENTORSHIP_PLANS = [
  {
    name: 'Quick Consultation',
    description: 'One-time 30-minute call for specific questions or quick guidance.',
    price: 50,
    duration: '30 min',
    features: [
      'Career advice',
      'Resume review',
      'Interview tips',
      'Tech guidance',
    ],
    popular: false,
  },
  {
    name: '1:1 Mentorship Session',
    description: 'Deep-dive session for comprehensive guidance on career or technical topics.',
    price: 150,
    duration: '60 min',
    features: [
      'Everything in Quick Consultation',
      'Mock interview',
      'Code review',
      'Follow-up email support',
      'Recording of session',
    ],
    popular: true,
  },
  {
    name: 'Monthly Mentorship',
    description: 'Ongoing mentorship with regular check-ins and unlimited async support.',
    price: 400,
    duration: '4 sessions/month',
    features: [
      'Weekly 1:1 calls (4 per month)',
      'Unlimited async messaging',
      'Resume & LinkedIn optimization',
      'Interview preparation',
      'Career roadmap planning',
      'Direct access via Slack',
    ],
    popular: false,
  },
];

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

export default function ResourcesPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Resources</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Curated guides, courses, and mentorship to accelerate your tech career.
            Learn from real-world experience at top companies.
          </p>
        </motion.section>

        {/* Free Resources */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
            <Download className="text-green-400" size={28} />
            <h2 className="text-3xl font-bold">Free Resources</h2>
            <span className="px-3 py-1 text-xs bg-green-400/20 text-green-400 rounded-full">
              No signup required
            </span>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {FREE_RESOURCES.map((resource, index) => (
              <motion.a
                key={index}
                href={resource.href}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                className="group glass rounded-xl p-6 hover:border-green-400/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-green-400/10 flex items-center justify-center">
                    <resource.icon className="text-green-400" size={24} />
                  </div>
                  <span className="text-xs text-gray-500">{resource.downloadCount} downloads</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                  {resource.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{resource.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{resource.type}</span>
                  <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                    Download Free <ArrowRight size={14} />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Premium Courses */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
            <Video className="text-[var(--accent)]" size={28} />
            <h2 className="text-3xl font-bold">Premium Courses</h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {PREMIUM_COURSES.filter(c => c.featured).map((course, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                className="relative glass rounded-xl overflow-hidden"
              >
                {/* Sale badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                  {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{course.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{course.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs bg-[var(--accent)]/10 text-[var(--accent)] rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Video size={14} />
                      {course.lessons} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {course.students}
                    </span>
                    <span className="flex items-center gap-1 text-yellow-400">
                      <Star size={14} fill="currentColor" />
                      {course.rating}
                    </span>
                  </div>
                  
                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold text-white">${course.price}</span>
                      <span className="text-gray-500 line-through ml-2">${course.originalPrice}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-[var(--accent)] text-black font-medium rounded-lg hover:bg-[var(--accent)]/90 transition-colors"
                    >
                      Enroll Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Other courses */}
          <div className="mt-6">
            {PREMIUM_COURSES.filter(c => !c.featured).map((course, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                className="glass rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{course.title}</h3>
                  <p className="text-gray-400 text-sm">{course.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span>{course.duration}</span>
                    <span>•</span>
                    <span>{course.lessons} lessons</span>
                    <span>•</span>
                    <span className="text-yellow-400 flex items-center gap-1">
                      <Star size={12} fill="currentColor" />
                      {course.rating}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-2xl font-bold text-white">${course.price}</span>
                    <span className="text-gray-500 line-through ml-2 text-sm">${course.originalPrice}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors"
                  >
                    Learn More
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Mentorship */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
            <Calendar className="text-[var(--accent-tertiary)]" size={28} />
            <h2 className="text-3xl font-bold">1:1 Mentorship</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {MENTORSHIP_PLANS.map((plan, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                className={`relative glass rounded-xl p-6 ${
                  plan.popular ? 'border-[var(--accent)]/50 ring-2 ring-[var(--accent)]/20' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--accent)] text-black text-xs font-bold rounded-full">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                  </div>
                  <span className="text-gray-500 text-sm">{plan.duration}</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 font-medium rounded-lg transition-colors ${
                    plan.popular
                      ? 'bg-[var(--accent)] text-black hover:bg-[var(--accent)]/90'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Book Session
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">What People Say</h2>
            <p className="text-gray-400">Feedback from students and mentees</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "Gaurav's system design course is hands-down the best I've taken. Got an offer from Google after completing it!",
                name: "Alex Chen",
                role: "SWE @ Google",
              },
              {
                quote: "The mentorship sessions were invaluable. Direct, actionable feedback that helped me land my dream job.",
                name: "Priya Sharma",
                role: "SDE @ Amazon",
              },
              {
                quote: "The OMSCS guide saved me so much time. Wish I had this when I started the program.",
                name: "Michael Torres",
                role: "OMSCS Student",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <p className="font-medium text-white">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="gradient-border p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-3">Have a specific question?</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Reach out directly and I&apos;ll get back to you within 24 hours.
            </p>
            <motion.a
              href="mailto:gpande@gatech.edu"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Contact Me <ExternalLink size={18} />
            </motion.a>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
