'use client';

import { motion } from 'framer-motion';
import { 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Github, 
  Linkedin, 
  Mail, 
  Twitter,
  ExternalLink,
  MapPin,
  Calendar
} from 'lucide-react';
import Image from 'next/image';

// Work Experience Data
const EXPERIENCE = [
  {
    company: 'Microsoft',
    role: 'Software Engineer - Machine Learning',
    team: 'Azure Platform',
    location: 'Redmond, WA',
    period: 'Feb 2021 - Present',
    description: 'Building self-healing networks and intelligent infrastructure at scale. Working on ML-powered anomaly detection and automated remediation systems for Azure.',
    technologies: ['Python', 'Azure ML', 'Kubernetes', 'Distributed Systems', 'ML Ops'],
    color: '#00a4ef',
  },
  {
    company: 'VMware',
    role: 'Machine Learning Intern',
    team: 'Hands on Lab - Recommendation System',
    location: 'Palo Alto, CA',
    period: 'May 2020 - Aug 2020',
    description: 'Developed recommendation algorithms for lab content discovery. Built ML pipelines for user behavior analysis and content personalization.',
    technologies: ['Python', 'TensorFlow', 'Recommendation Systems', 'Data Analytics'],
    color: '#607078',
  },
  {
    company: 'Georgia Tech',
    role: 'Graduate Teaching Assistant',
    team: 'CS6601: Artificial Intelligence',
    location: 'Atlanta, GA',
    period: 'Jan 2020 - Dec 2020',
    description: 'TA for graduate-level AI course under Prof. Thad Starner. Assisted 500+ students with concepts in search, probability, ML, and game theory.',
    technologies: ['Python', 'AI', 'Machine Learning', 'Teaching'],
    color: '#b3a369',
  },
  {
    company: 'Cisco Systems',
    role: 'Software Engineer',
    team: 'Innovation Edge',
    location: 'Bangalore, India',
    period: 'Nov 2017 - Aug 2019',
    description: 'Built ML-powered automation solutions. Contributed to OpenDaylight SDN controller. Developed predictive analytics for network management.',
    technologies: ['Python', 'Java', 'Machine Learning', 'SDN', 'OpenDaylight'],
    color: '#049fd9',
  },
];

// Education Data
const EDUCATION = [
  {
    institution: 'Georgia Institute of Technology',
    degree: 'M.S. Computer Science',
    specialization: 'Machine Learning',
    period: '2019 - 2020',
    location: 'Atlanta, GA',
    color: '#b3a369',
  },
  {
    institution: 'College of Technology, GBPUAT',
    degree: 'B.Tech Computer Science',
    specialization: '',
    period: '2010 - 2014',
    location: 'Pantnagar, India',
    color: '#1e88e5',
  },
];

// Featured Projects
const PROJECTS = [
  {
    title: 'Self-Healing Networks',
    description: 'ML-powered system for automated network anomaly detection and remediation at Azure scale.',
    tags: ['Python', 'Azure ML', 'Kubernetes'],
    link: '#',
    featured: true,
  },
  {
    title: 'OpenDaylight Cardinal',
    description: 'Open source monitoring and health check module for the OpenDaylight SDN controller.',
    tags: ['Java', 'SDN', 'Open Source'],
    link: 'https://github.com/opendaylight/cardinal',
    featured: true,
  },
  {
    title: 'Stock Prediction with Sentiment',
    description: 'Predictive analytics for stock trading using social media sentiment analysis.',
    tags: ['Python', 'NLP', 'ML'],
    link: '#',
    featured: true,
  },
  {
    title: 'Image Denoising',
    description: 'Deep learning approach for image noise reduction using autoencoders.',
    tags: ['TensorFlow', 'Computer Vision', 'Deep Learning'],
    link: '#',
    featured: false,
  },
  {
    title: 'Machine Translation',
    description: 'Neural machine translation system using sequence-to-sequence models.',
    tags: ['NLP', 'PyTorch', 'Transformers'],
    link: '#',
    featured: false,
  },
  {
    title: 'Recommendation System',
    description: 'Content-based and collaborative filtering for VMware Hands on Lab.',
    tags: ['Python', 'ML', 'Recommendation'],
    link: '#',
    featured: false,
  },
];

// Tech Stack
const TECH_STACK = {
  'Languages': ['Python', 'Java', 'TypeScript', 'JavaScript', 'C++', 'SQL'],
  'ML/AI': ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Azure ML', 'NLP', 'Computer Vision'],
  'Cloud & Infra': ['Azure', 'AWS', 'Kubernetes', 'Docker', 'Terraform'],
  'Frameworks': ['React', 'Next.js', 'FastAPI', 'Spring Boot', 'Node.js'],
  'Databases': ['PostgreSQL', 'MongoDB', 'Redis', 'Cosmos DB'],
  'Tools': ['Git', 'Linux', 'VS Code', 'Jupyter', 'MLflow'],
};

// Social Links
const SOCIAL_LINKS = [
  { icon: Github, href: 'https://github.com/Gaurav-Pande', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/gpande2/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/garvpande11235', label: 'Twitter' },
  { icon: Mail, href: 'mailto:gpande@gatech.edu', label: 'Email' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-[var(--accent)]/30 relative">
                <Image
                  src="/gaurav.jpg"
                  alt="Gaurav Pande"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-[#030014]" />
            </motion.div>

            {/* Bio */}
            <div className="text-center md:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                About <span className="gradient-text">Me</span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center md:justify-start gap-2 text-gray-400 mb-4"
              >
                <MapPin size={16} />
                <span>Seattle, WA</span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-300 text-lg max-w-2xl leading-relaxed mb-6"
              >
                I&apos;m a Software Engineer at Microsoft Azure, where I build intelligent systems 
                that power self-healing networks. I graduated from Georgia Tech with an MS in 
                Computer Science, specializing in Machine Learning. I&apos;m passionate about 
                distributed systems, ML/AI, and open source.
              </motion.p>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center md:justify-start gap-4"
              >
                {SOCIAL_LINKS.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-[var(--accent)]/50 transition-all duration-300"
                    aria-label={link.label}
                  >
                    <link.icon size={20} className="text-gray-400 hover:text-[var(--accent)]" />
                  </motion.a>
                ))}
                <motion.a
                  href="/resume.pdf"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 bg-[var(--accent)] text-black font-medium rounded-lg hover:bg-[var(--accent)]/90 transition-colors"
                >
                  Download CV
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Work Experience Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
            <Briefcase className="text-[var(--accent)]" size={28} />
            <h2 className="text-3xl font-bold">Professional Experience</h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--accent)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)]" />

            <div className="space-y-8">
              {EXPERIENCE.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative pl-16 md:pl-20"
                >
                  {/* Timeline dot */}
                  <div 
                    className="absolute left-4 md:left-6 w-4 h-4 rounded-full border-4 border-[#030014]"
                    style={{ backgroundColor: exp.color }}
                  />

                  <div className="glass rounded-xl p-6 hover:border-white/20 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                        <p className="text-[var(--accent)]">{exp.company} • {exp.team}</p>
                      </div>
                      <div className="flex items-center gap-4 text-gray-400 text-sm mt-2 md:mt-0">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {exp.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {exp.period}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-400 mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
            <GraduationCap className="text-[var(--accent-secondary)]" size={28} />
            <h2 className="text-3xl font-bold">Education</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {EDUCATION.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                className="glass rounded-xl p-6 hover:border-white/20 transition-all duration-300"
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${edu.color}20` }}
                >
                  <GraduationCap size={24} style={{ color: edu.color }} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">{edu.degree}</h3>
                {edu.specialization && (
                  <p className="text-[var(--accent)] text-sm mb-2">Specialization: {edu.specialization}</p>
                )}
                <p className="text-gray-300">{edu.institution}</p>
                <div className="flex items-center gap-4 mt-3 text-gray-400 text-sm">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {edu.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {edu.period}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
            <Code2 className="text-[var(--accent-tertiary)]" size={28} />
            <h2 className="text-3xl font-bold">Featured Projects</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project, index) => (
              <motion.a
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                className="group glass rounded-xl p-6 hover:border-[var(--accent)]/30 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white group-hover:text-[var(--accent)] transition-colors">
                    {project.title}
                  </h3>
                  <ExternalLink size={18} className="text-gray-500 group-hover:text-[var(--accent)] transition-colors" />
                </div>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded text-[var(--accent)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Tech Stack Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
            <Code2 className="text-[var(--accent)]" size={28} />
            <h2 className="text-3xl font-bold">Technologies</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(TECH_STACK).map(([category, techs], index) => (
              <motion.div
                key={category}
                variants={itemVariants}
                className="glass rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech) => (
                    <motion.span
                      key={tech}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 text-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[var(--accent)]/30 rounded-lg text-gray-300 hover:text-white transition-all cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

      </div>
    </div>
  );
}
