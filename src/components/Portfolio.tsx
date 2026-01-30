'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Github, Linkedin, Mail, ExternalLink, MapPin, Briefcase, GraduationCap, Folder } from 'lucide-react';

interface PortfolioProps {
  onBack: () => void;
}

const EXPERIENCE = [
  {
    company: 'Microsoft',
    role: 'Software Engineer (Machine Learning)',
    period: '2021 - Present',
    description: 'Building intelligent systems at scale. Working on Azure cloud infrastructure, distributed systems, and machine learning solutions.',
    tech: ['Python', 'C#', 'Azure', 'Kubernetes', 'TypeScript'],
  },
  {
    company: 'Georgia Institute of Technology',
    role: 'Master of Science in Computer Science',
    period: '2019 - 2021',
    description: 'Graduated with 4.0 GPA. Focused on Machine Learning and Artificial Intelligence. Member of India Club at Georgia Tech.',
    tech: ['Machine Learning', 'AI', 'Computer Vision', 'NLP'],
    isEducation: true,
  },
  {
    company: 'Cisco Systems',
    role: 'Software Engineer',
    period: '2017 - 2019',
    description: 'Worked on Innovation Edge team developing network automation solutions and SDN controllers. Contributed to OpenDaylight, an open-source distributed SDN controller.',
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
  // Dark mode colors only
  const colors = {
    bg: '#0a0a12',
    navBg: 'rgba(10, 10, 18, 0.9)',
    navBorder: 'rgba(255,255,255,0.05)',
    text: 'white',
    textMuted: '#9ca3af',
    textSubtle: '#6b7280',
    accent: '#fb923c',
    accentMuted: 'rgba(251, 146, 60, 0.6)',
    cardBg: 'rgba(255,255,255,0.02)',
    cardBorder: 'rgba(255,255,255,0.05)',
    timelineBorder: 'rgba(251, 146, 60, 0.3)',
    sectionDivider: 'rgba(255,255,255,0.1)',
    skillBg: 'rgba(251, 146, 60, 0.1)',
    skillBorder: 'rgba(251, 146, 60, 0.3)',
    photoBorder: 'rgba(251, 146, 60, 0.4)',
    photoShadow: 'rgba(251, 146, 60, 0.2)',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ minHeight: '100vh', backgroundColor: colors.bg, color: colors.text, overflowX: 'hidden' }}
    >
      {/* CSS Keyframes for animations */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Fixed Navigation */}
      <nav style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 50, 
        backgroundColor: colors.navBg, 
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${colors.navBorder}`
      }}>
        <Container>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', paddingBottom: '16px' }}>
            <motion.button
              onClick={onBack}
              whileHover={{ x: -4 }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.textMuted, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <ArrowLeft size={18} />
              <span style={{ fontSize: '14px' }}>Back</span>
            </motion.button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px', fontSize: '14px' }}>
              <a href="#about" style={{ color: colors.textMuted, textDecoration: 'none' }}>About</a>
              <a href="#experience" style={{ color: colors.textMuted, textDecoration: 'none' }}>Experience</a>
              <a href="#projects" style={{ color: colors.textMuted, textDecoration: 'none' }}>Projects</a>
              <a href="#skills" style={{ color: colors.textMuted, textDecoration: 'none' }}>Skills</a>
              <a href="#contact" style={{ color: colors.textMuted, textDecoration: 'none' }}>Contact</a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <a href="https://github.com/Gaurav-Pande" target="_blank" rel="noopener noreferrer" style={{ color: colors.textMuted }}>
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/gpande2/" target="_blank" rel="noopener noreferrer" style={{ color: colors.textMuted }}>
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </Container>
      </nav>

      {/* ============ HERO / ABOUT SECTION ============ */}
      <section id="about" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px' }}>
        <Container>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '60px', flexWrap: 'wrap' }}>
            {/* Left side - Text content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ flex: '1', minWidth: '300px' }}
            >
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{ color: colors.accent, fontFamily: 'monospace', fontSize: '14px', marginBottom: '24px' }}
              >
                Hi, my name is
              </motion.p>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 'bold', color: colors.text, marginBottom: '16px', whiteSpace: 'nowrap' }}
              >
                Gaurav Pande
              </motion.h1>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 'bold', color: colors.textSubtle, marginBottom: '32px' }}
              >
                I build things for the cloud.
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{ color: colors.textMuted, fontSize: '17px', maxWidth: '500px', lineHeight: 1.7, marginBottom: '40px' }}
              >
                I&apos;m a software engineer at <span style={{ color: colors.accent }}>Microsoft</span>, 
                specializing in building scalable distributed systems and machine learning solutions. 
                Georgia Tech CS grad passionate about AI, cloud infrastructure, and creating elegant 
                solutions to complex problems.
              </motion.p>
            
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '24px', fontSize: '14px', color: colors.textSubtle }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={16} style={{ color: colors.accentMuted }} />
                  Seattle, WA
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Briefcase size={16} style={{ color: colors.accentMuted }} />
                  Microsoft
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <GraduationCap size={16} style={{ color: colors.accentMuted }} />
                  Georgia Tech
                </span>
              </motion.div>
            </motion.div>

            {/* Right side - Profile Picture */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{ 
                flexShrink: 0,
                position: 'relative',
              }}
            >
              <div style={{
                width: '280px',
                height: '280px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: `4px solid ${colors.photoBorder}`,
                boxShadow: `0 0 40px ${colors.photoShadow}`,
                position: 'relative',
              }}>
                <img 
                  src="/gaurav.jpg" 
                  alt="Gaurav Pande"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(20%)',
                    transition: 'filter 0.3s ease',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.filter = 'grayscale(0%)'}
                  onMouseOut={(e) => e.currentTarget.style.filter = 'grayscale(20%)'}
                />
              </div>
              {/* Decorative ring */}
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '-10px',
                right: '-10px',
                bottom: '-10px',
                borderRadius: '50%',
                border: `2px dashed ${colors.accentMuted}`,
                animation: 'spin 20s linear infinite',
              }} />
            </motion.div>
          </div>
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
            <span style={{ color: colors.accent, fontFamily: 'monospace', fontSize: '14px' }}>01.</span>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: colors.text, whiteSpace: 'nowrap' }}>Experience</h2>
            <div style={{ flex: 1, height: '1px', backgroundColor: colors.sectionDivider }} />
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', marginLeft: '16px' }}>
            {EXPERIENCE.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{ position: 'relative', paddingLeft: '40px', borderLeft: `2px solid ${colors.timelineBorder}` }}
              >
                {/* Timeline dot */}
                <div style={{ 
                  position: 'absolute', 
                  left: '-9px', 
                  top: '4px', 
                  width: '16px', 
                  height: '16px', 
                  borderRadius: '50%', 
                  backgroundColor: colors.bg, 
                  border: `3px solid ${colors.accent}` 
                }} />
                
                <p style={{ color: colors.textSubtle, fontFamily: 'monospace', fontSize: '14px', marginBottom: '12px' }}>{exp.period}</p>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: colors.text, marginBottom: '12px' }}>
                  {exp.role} <span style={{ color: colors.accent }}>@ {exp.company}</span>
                </h3>
                <p style={{ color: colors.textMuted, marginBottom: '20px', lineHeight: 1.7 }}>{exp.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {exp.tech.map(t => (
                    <span key={t} style={{ 
                      padding: '6px 14px', 
                      fontSize: '12px', 
                      fontFamily: 'monospace', 
                      color: colors.accent, 
                      backgroundColor: colors.skillBg, 
                      borderRadius: '9999px',
                      border: `1px solid ${colors.skillBorder}`
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
      <section id="projects" style={{ paddingTop: '96px', paddingBottom: '96px', backgroundColor: colors.cardBg }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '64px' }}
          >
            <span style={{ color: colors.accent, fontFamily: 'monospace', fontSize: '14px' }}>02.</span>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: colors.text, whiteSpace: 'nowrap' }}>Featured Projects</h2>
            <div style={{ flex: 1, height: '1px', backgroundColor: colors.sectionDivider }} />
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
                  border: `1px solid ${colors.cardBorder}`,
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <Folder size={44} style={{ color: colors.accent }} strokeWidth={1} />
                  <ExternalLink size={20} style={{ color: colors.textSubtle }} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: colors.text, marginBottom: '12px' }}>
                  {project.title}
                </h3>
                <p style={{ color: colors.textMuted, fontSize: '14px', marginBottom: '24px', lineHeight: 1.7 }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '12px', fontFamily: 'monospace', color: colors.textSubtle }}>
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
            <span style={{ color: colors.accent, fontFamily: 'monospace', fontSize: '14px' }}>03.</span>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: colors.text, whiteSpace: 'nowrap' }}>Skills & Technologies</h2>
            <div style={{ flex: 1, height: '1px', backgroundColor: colors.sectionDivider }} />
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
                <h3 style={{ color: colors.accent, fontFamily: 'monospace', fontSize: '14px', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{category}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {skills.map(skill => (
                    <li key={skill} style={{ color: colors.textMuted, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colors.accentMuted }} />
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
      <section id="contact" style={{ paddingTop: '96px', paddingBottom: '96px', backgroundColor: colors.cardBg }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}
          >
            <p style={{ color: colors.accent, fontFamily: 'monospace', fontSize: '14px', marginBottom: '20px' }}>04. What&apos;s Next?</p>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 'bold', color: colors.text, marginBottom: '32px' }}>Get In Touch</h2>
            <p style={{ color: colors.textMuted, fontSize: '18px', marginBottom: '48px', lineHeight: 1.7 }}>
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
                border: `2px solid ${colors.accent}`, 
                color: colors.accent, 
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
      <footer style={{ paddingTop: '48px', paddingBottom: '48px', borderTop: `1px solid ${colors.navBorder}` }}>
        <Container>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: colors.textSubtle, fontSize: '14px' }}>✨ Vibe coded with Next.js & Tailwind CSS</p>
            <p style={{ color: colors.textMuted, fontSize: '14px', marginTop: '8px' }}>© {new Date().getFullYear()} Gaurav Pande</p>
          </div>
        </Container>
      </footer>
    </motion.div>
  );
}
