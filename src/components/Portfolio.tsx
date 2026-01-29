'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Github, Linkedin, Mail, ExternalLink, MapPin, Briefcase, GraduationCap, Folder } from 'lucide-react';

interface PortfolioProps {
  onBack: () => void;
}

const EXPERIENCE = [
  {
    company: 'Microsoft Azure',
    role: 'Software Engineer',
    period: '2019 - Present',
    description: 'Building intelligent systems at scale. Working on Azure cloud infrastructure and distributed systems.',
    tech: ['Python', 'C#', 'Azure', 'Kubernetes', 'TypeScript'],
  },
  {
    company: 'Cisco Systems',
    role: 'Software Engineer',
    period: '2017 - 2019',
    description: 'Developed network automation solutions and SDN controllers for enterprise networking.',
    tech: ['Java', 'Python', 'OpenDaylight', 'REST APIs'],
  },
];

const PROJECTS = [
  {
    title: 'Machine Language Translation',
    description: 'Neural machine translation system using sequence-to-sequence models with attention mechanism.',
    tech: ['Python', 'TensorFlow', 'NLP'],
  },
  {
    title: 'Image Denoising',
    description: 'Deep learning approach to remove noise from images using autoencoders and CNNs.',
    tech: ['Python', 'PyTorch', 'Computer Vision'],
  },
  {
    title: 'Recommendation System',
    description: 'Collaborative filtering based recommendation engine for personalized content delivery.',
    tech: ['Python', 'Spark', 'ML'],
  },
  {
    title: 'Object Detection',
    description: 'Real-time object detection system using YOLO architecture for autonomous applications.',
    tech: ['Python', 'TensorFlow', 'OpenCV'],
  },
];

const SKILLS = {
  'Languages': ['Python', 'TypeScript', 'C#', 'Java', 'Go'],
  'ML/AI': ['TensorFlow', 'PyTorch', 'Scikit-learn', 'NLP', 'Computer Vision'],
  'Cloud': ['Azure', 'AWS', 'Kubernetes', 'Docker', 'Terraform'],
  'Web': ['React', 'Next.js', 'Node.js', 'GraphQL', 'REST'],
};

// Container component for consistent centering
function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div 
      style={{ 
        width: '100%', 
        maxWidth: '900px', 
        marginLeft: 'auto', 
        marginRight: 'auto', 
        paddingLeft: '48px', 
        paddingRight: '48px' 
      }}
      className={className}
    >
      {children}
    </div>
  );
}

export default function Portfolio({ onBack }: PortfolioProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ minHeight: '100vh', backgroundColor: '#0a0a12', color: 'white', overflowX: 'hidden' }}
    >
      {/* Fixed Navigation */}
      <nav style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 50, 
        backgroundColor: 'rgba(10, 10, 18, 0.9)', 
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <Container>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', paddingBottom: '16px' }}>
            <motion.button
              onClick={onBack}
              whileHover={{ x: -4 }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <ArrowLeft size={18} />
              <span style={{ fontSize: '14px' }}>Back</span>
            </motion.button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px', fontSize: '14px' }}>
              <a href="#about" style={{ color: '#9ca3af', textDecoration: 'none' }}>About</a>
              <a href="#experience" style={{ color: '#9ca3af', textDecoration: 'none' }}>Experience</a>
              <a href="#projects" style={{ color: '#9ca3af', textDecoration: 'none' }}>Projects</a>
              <a href="#skills" style={{ color: '#9ca3af', textDecoration: 'none' }}>Skills</a>
              <a href="#contact" style={{ color: '#9ca3af', textDecoration: 'none' }}>Contact</a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <a href="https://github.com/Gaurav-Pande" target="_blank" rel="noopener noreferrer" style={{ color: '#9ca3af' }}>
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/gpande2/" target="_blank" rel="noopener noreferrer" style={{ color: '#9ca3af' }}>
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </Container>
      </nav>

      {/* ============ HERO / ABOUT SECTION ============ */}
      <section id="about" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{ color: '#fb923c', fontFamily: 'monospace', fontSize: '14px', marginBottom: '24px' }}
            >
              Hi, my name is
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}
            >
              Gaurav Pande
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 'bold', color: '#6b7280', marginBottom: '32px' }}
            >
              I build things for the cloud.
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ color: '#9ca3af', fontSize: '18px', maxWidth: '540px', lineHeight: 1.7, marginBottom: '40px' }}
            >
              I&apos;m a software engineer at <span style={{ color: '#fb923c' }}>Microsoft Azure</span>, 
              specializing in building scalable distributed systems and intelligent applications. 
              I&apos;m passionate about machine learning, cloud infrastructure, and creating elegant 
              solutions to complex problems.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '24px', fontSize: '14px', color: '#6b7280' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} style={{ color: 'rgba(251, 146, 60, 0.6)' }} />
                Seattle, WA
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Briefcase size={16} style={{ color: 'rgba(251, 146, 60, 0.6)' }} />
                Microsoft
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <GraduationCap size={16} style={{ color: 'rgba(251, 146, 60, 0.6)' }} />
                Georgia Tech
              </span>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ============ EXPERIENCE SECTION ============ */}
      <section id="experience" style={{ paddingTop: '96px', paddingBottom: '96px' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '64px' }}
          >
            <span style={{ color: '#fb923c', fontFamily: 'monospace', fontSize: '14px' }}>01.</span>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', whiteSpace: 'nowrap' }}>Experience</h2>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', marginLeft: '16px' }}>
            {EXPERIENCE.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{ position: 'relative', paddingLeft: '40px', borderLeft: '2px solid rgba(251, 146, 60, 0.3)' }}
              >
                {/* Timeline dot */}
                <div style={{ 
                  position: 'absolute', 
                  left: '-9px', 
                  top: '4px', 
                  width: '16px', 
                  height: '16px', 
                  borderRadius: '50%', 
                  backgroundColor: '#0a0a12', 
                  border: '3px solid #fb923c' 
                }} />
                
                <p style={{ color: '#6b7280', fontFamily: 'monospace', fontSize: '14px', marginBottom: '12px' }}>{exp.period}</p>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'white', marginBottom: '12px' }}>
                  {exp.role} <span style={{ color: '#fb923c' }}>@ {exp.company}</span>
                </h3>
                <p style={{ color: '#9ca3af', marginBottom: '20px', lineHeight: 1.7 }}>{exp.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {exp.tech.map(t => (
                    <span key={t} style={{ 
                      padding: '6px 14px', 
                      fontSize: '12px', 
                      fontFamily: 'monospace', 
                      color: '#fdba74', 
                      backgroundColor: 'rgba(251, 146, 60, 0.1)', 
                      borderRadius: '9999px',
                      border: '1px solid rgba(251, 146, 60, 0.2)'
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ PROJECTS SECTION ============ */}
      <section id="projects" style={{ paddingTop: '96px', paddingBottom: '96px', backgroundColor: 'rgba(255,255,255,0.01)' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '64px' }}
          >
            <span style={{ color: '#fb923c', fontFamily: 'monospace', fontSize: '14px' }}>02.</span>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', whiteSpace: 'nowrap' }}>Featured Projects</h2>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {PROJECTS.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                style={{ 
                  padding: '28px', 
                  borderRadius: '12px', 
                  backgroundColor: '#111118', 
                  border: '1px solid rgba(255,255,255,0.05)',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <Folder size={44} style={{ color: '#fb923c' }} strokeWidth={1} />
                  <ExternalLink size={20} style={{ color: '#4b5563' }} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '12px' }}>
                  {project.title}
                </h3>
                <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '24px', lineHeight: 1.7 }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '12px', fontFamily: 'monospace', color: '#6b7280' }}>
                  {project.tech.map(t => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ SKILLS SECTION ============ */}
      <section id="skills" style={{ paddingTop: '96px', paddingBottom: '96px' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '64px' }}
          >
            <span style={{ color: '#fb923c', fontFamily: 'monospace', fontSize: '14px' }}>03.</span>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', whiteSpace: 'nowrap' }}>Skills & Technologies</h2>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '48px' }}>
            {Object.entries(SKILLS).map(([category, skills], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 style={{ color: '#fb923c', fontFamily: 'monospace', fontSize: '14px', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{category}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {skills.map(skill => (
                    <li key={skill} style={{ color: '#9ca3af', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'rgba(251, 146, 60, 0.6)' }} />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ CONTACT SECTION ============ */}
      <section id="contact" style={{ paddingTop: '96px', paddingBottom: '96px', backgroundColor: 'rgba(255,255,255,0.01)' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}
          >
            <p style={{ color: '#fb923c', fontFamily: 'monospace', fontSize: '14px', marginBottom: '20px' }}>04. What&apos;s Next?</p>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 'bold', color: 'white', marginBottom: '32px' }}>Get In Touch</h2>
            <p style={{ color: '#9ca3af', fontSize: '18px', marginBottom: '48px', lineHeight: 1.7 }}>
              I&apos;m currently open to new opportunities and always happy to connect. 
              Whether you have a question or just want to say hi, my inbox is always open.
            </p>
            <motion.a
              href="mailto:gaurav.pande@example.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '12px', 
                padding: '16px 40px', 
                backgroundColor: 'transparent', 
                border: '2px solid #fb923c', 
                color: '#fb923c', 
                borderRadius: '8px', 
                fontWeight: '500',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
            >
              <Mail size={20} />
              Say Hello
            </motion.a>
          </motion.div>
        </Container>
      </section>

      {/* ============ FOOTER ============ */}
      <footer style={{ paddingTop: '48px', paddingBottom: '48px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Container>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>Built with Next.js & Tailwind CSS</p>
            <p style={{ color: '#4b5563', fontSize: '14px', marginTop: '8px' }}>© {new Date().getFullYear()} Gaurav Pande</p>
          </div>
        </Container>
      </footer>
    </motion.div>
  );
}
