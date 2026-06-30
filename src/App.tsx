/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, Linkedin, Mail, MapPin, Briefcase, 
  Calendar, ChevronRight, X, ExternalLink, 
  Layout, Database, Terminal, Menu, MessageSquare, Send, Loader2
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

// --- Data ---

const PERSONAL_INFO = {
  name: "Rohith Kumar",
  title: "Senior Full-Stack Engineer",
  tagline: "Crafting elegant digital experiences through clean code and thoughtful design.",
  bio: "I am a passionate software engineer with over 8 years of experience building scalable web applications and elegant user interfaces. I thrive at the intersection of design and engineering, creating products that are both beautiful and highly functional. My approach combines clean code architecture with an obsessive attention to user experience.",
  location: "San Francisco, CA",
  experienceYears: "8+ Years",
  availability: "Open to Opportunities",
  email: "rohithkumargopal@gmail.com",
  linkedin: "https://www.linkedin.com/in/rohith-gopal-91b727374/",
  github: "https://github.com/rohithkumargopal-droid?tab=repositories",
  avatar: "https://picsum.photos/seed/rohith/400/400"
};

const SKILL_CATEGORIES = [
  {
    title: 'Frontend Development',
    icon: <Layout className="w-6 h-6 text-[#D4AF37]" />,
    skills: [
      { name: 'React & Next.js', level: 95, description: 'Extensive experience building complex SPAs and SSR applications using React, Hooks, Context API, and Next.js app router.' },
      { name: 'TypeScript', level: 90, description: 'Deep understanding of static typing, generics, and advanced TypeScript patterns to build robust and maintainable codebases.' },
      { name: 'Tailwind CSS', level: 95, description: 'Expert in utility-first CSS, creating fully responsive, accessible, and highly customized design systems.' }
    ]
  },
  {
    title: 'Backend & Architecture',
    icon: <Database className="w-6 h-6 text-[#D4AF37]" />,
    skills: [
      { name: 'Node.js & Express', level: 85, description: 'Building scalable RESTful APIs and microservices using Node.js, Express, and Fastify.' },
      { name: 'PostgreSQL', level: 80, description: 'Designing relational database schemas, writing complex queries, and optimizing database performance.' },
      { name: 'System Design', level: 75, description: 'Architecting scalable cloud solutions using AWS, Docker, and CI/CD pipelines for high availability.' }
    ]
  },
  {
    title: 'Tools & Practices',
    icon: <Terminal className="w-6 h-6 text-[#D4AF37]" />,
    skills: [
      { name: 'Git & GitHub', level: 90, description: 'Advanced version control workflows, code reviews, and collaborative development practices.' },
      { name: 'UI/UX Design', level: 80, description: 'Bridging the gap between design and engineering using Figma, focusing on user-centric interfaces.' },
      { name: 'Agile Leadership', level: 85, description: 'Leading cross-functional teams, sprint planning, and mentoring junior developers.' }
    ]
  }
];

const PROJECTS = [
  {
    id: 1,
    title: 'Nexus E-Commerce',
    shortDesc: 'A high-performance headless storefront.',
    fullDesc: 'Built a headless Shopify storefront using Next.js and Tailwind CSS. Implemented advanced caching strategies and optimized Core Web Vitals, resulting in a 25% increase in conversion rate and sub-second page loads.',
    image: 'https://picsum.photos/seed/nexus/800/500',
    tools: ['Next.js', 'React', 'Tailwind CSS', 'Shopify API'],
    outcome: 'Increased conversion rate by 25% and reduced bounce rate by 15%.',
    link: 'https://example.com/nexus'
  },
  {
    id: 2,
    title: 'CollabSpace',
    shortDesc: 'Real-time collaborative whiteboard.',
    fullDesc: 'Developed a real-time collaborative workspace tool allowing remote teams to brainstorm using a shared infinite canvas. Utilized WebSockets for low-latency updates and the Canvas API for rendering.',
    image: 'https://picsum.photos/seed/collab/800/500',
    tools: ['TypeScript', 'Node.js', 'Socket.io', 'Canvas API'],
    outcome: 'Acquired 10,000+ active users within the first three months of launch.',
    link: 'https://example.com/collabspace'
  },
  {
    id: 3,
    title: 'AI Content Studio',
    shortDesc: 'LLM-powered writing assistant.',
    fullDesc: 'Created an intelligent writing assistant that leverages the Gemini API to help marketers generate, edit, and optimize content. Features include tone adjustment, summarization, and SEO suggestions.',
    image: 'https://picsum.photos/seed/aistudio/800/500',
    tools: ['React', 'Gemini API', 'Tailwind CSS', 'Express'],
    outcome: 'Saved users an average of 5 hours per week on content creation tasks.',
    link: 'https://example.com/aistudio'
  }
];

const EXPERIENCE = [
  {
    company: 'InnovateCorp',
    role: 'Tech Lead',
    period: '2021 - Present',
    achievements: [
      'Led a team of 8 engineers to rebuild the core SaaS platform, migrating from a legacy monolith to a microservices architecture.',
      'Reduced infrastructure costs by 30% through containerization and AWS optimization.',
      'Established engineering standards and CI/CD pipelines, reducing deployment time from hours to minutes.'
    ]
  },
  {
    company: 'BuildIt',
    role: 'Senior Software Engineer',
    period: '2018 - 2021',
    achievements: [
      'Developed and maintained multiple high-traffic React applications serving over 1M monthly active users.',
      'Implemented a comprehensive design system that accelerated frontend development across 4 product teams.',
      'Mentored 3 junior developers who were subsequently promoted to mid-level roles.'
    ]
  },
  {
    company: 'WebSolutions',
    role: 'Frontend Developer',
    period: '2015 - 2018',
    achievements: [
      'Built responsive, accessible web interfaces for diverse client projects using HTML, CSS, and JavaScript.',
      'Collaborated closely with designers to ensure pixel-perfect implementation of UI mockups.',
      'Optimized legacy codebases, improving Lighthouse performance scores by an average of 40 points.'
    ]
  }
];

const NAV_ITEMS = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'];

// --- Main Component ---

export default function App() {
  const [activePage, setActivePage] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Lock body scroll when modals or mobile menu are open
  useEffect(() => {
    if (selectedSkill || selectedProject || isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedSkill, selectedProject, isMobileMenuOpen]);

  const handleNavClick = (page: string) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans selection:bg-[#D4AF37] selection:text-[#050505]">
      
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-40 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#222222] h-20 flex items-center justify-between px-6 md:px-16">
        <button 
          onClick={() => handleNavClick('Home')}
          className="font-serif italic text-2xl font-bold text-[#D4AF37]"
        >
          RK.
        </button>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {NAV_ITEMS.map(item => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className={`relative text-xs uppercase tracking-[0.1em] font-semibold transition-colors py-2 ${
                activePage === item ? 'text-[#D4AF37]' : 'text-[#A3A3A3] hover:text-[#F5F5F5]'
              }`}
            >
              {item}
              {activePage === item && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#D4AF37]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-[#A3A3A3] hover:text-[#F5F5F5]"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#050505] flex flex-col"
          >
            <div className="px-6 h-20 flex items-center justify-between border-b border-[#222222]">
              <span className="font-serif italic text-2xl font-bold text-[#D4AF37]">RK.</span>
              <button 
                className="p-2 text-[#A3A3A3] hover:text-[#F5F5F5]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col p-10 space-y-8 mt-8">
              {NAV_ITEMS.map(item => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`text-2xl font-serif text-left ${
                    activePage === item ? 'text-[#D4AF37] italic' : 'text-[#A3A3A3]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="pt-20 min-h-screen relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
          >
            {activePage === 'Home' && <HomeSection setPage={handleNavClick} />}
            {activePage === 'About' && <AboutSection />}
            {activePage === 'Skills' && <SkillsSection onSelectSkill={setSelectedSkill} />}
            {activePage === 'Projects' && <ProjectsSection onSelectProject={setSelectedProject} />}
            {activePage === 'Experience' && <ExperienceSection />}
            {activePage === 'Contact' && <ContactSection />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Modals */}
      <SkillModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      
      {/* AI Chat */}
      <AIChat />
    </div>
  );
}

// --- Page Sections ---

function HomeSection({ setPage }: { setPage: (page: string) => void }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between min-h-[calc(100vh-80px)] px-6 md:px-16 py-12 max-w-7xl mx-auto gap-12">
      <div className="flex-1 text-left order-2 md:order-1">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-serif text-6xl md:text-[100px] leading-[0.9] text-[#F5F5F5] mb-6"
        >
          {PERSONAL_INFO.name.split(' ')[0]}<br/>
          <span className="text-[#D4AF37] italic">{PERSONAL_INFO.name.split(' ')[1]}.</span>
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-[#A3A3A3] max-w-md mb-10 font-light"
        >
          {PERSONAL_INFO.tagline}
        </motion.p>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button 
            onClick={() => setPage('Projects')} 
            className="px-8 py-4 bg-[#D4AF37] text-[#050505] border border-[#D4AF37] rounded-none text-[13px] uppercase tracking-wider font-semibold hover:bg-transparent hover:text-[#D4AF37] transition-colors w-full sm:w-auto"
          >
            View My Work
          </button>
          <button 
            onClick={() => setPage('Contact')} 
            className="px-8 py-4 bg-transparent text-[#F5F5F5] border border-[#222222] rounded-none text-[13px] uppercase tracking-wider font-semibold hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors w-full sm:w-auto"
          >
            Contact Me
          </button>
        </motion.div>
      </div>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="order-1 md:order-2 flex-shrink-0"
      >
        <div className="w-64 h-64 md:w-[320px] md:h-[320px] rounded-full bg-[#111111] border border-[#222222] flex items-center justify-center overflow-hidden">
          <img 
            src={PERSONAL_INFO.avatar} 
            alt={PERSONAL_INFO.name} 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
            referrerPolicy="no-referrer" 
          />
        </div>
      </motion.div>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="px-6 md:px-16 py-16 md:py-24 max-w-7xl mx-auto">
      <h2 className="font-serif text-5xl mb-10 border-b border-[#222222] pb-5 text-[#F5F5F5]">The Engineer.</h2>
      <div className="grid md:grid-cols-[1fr_300px] gap-16">
        <div>
          <p className="font-serif text-2xl leading-relaxed text-[#F5F5F5]">
            {PERSONAL_INFO.bio}
          </p>
          <p className="mt-6 text-[#A3A3A3] leading-relaxed font-light">
            When I'm not coding, you can usually find me exploring new coffee shops, reading about emerging technologies, or contributing to open-source projects. I believe in continuous learning and sharing knowledge with the community.
          </p>
        </div>
        <div className="border border-[#222222] bg-[#0A0A0A] p-8 h-fit space-y-6">
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#A3A3A3] block mb-1">Location</label>
            <p className="font-bold text-[#F5F5F5]">{PERSONAL_INFO.location}</p>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#A3A3A3] block mb-1">Experience</label>
            <p className="font-bold text-[#F5F5F5]">{PERSONAL_INFO.experienceYears}</p>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#A3A3A3] block mb-1">Availability</label>
            <p className="font-bold text-[#D4AF37]">{PERSONAL_INFO.availability}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillsSection({ onSelectSkill }: { onSelectSkill: (skill: any) => void }) {
  return (
    <div className="px-6 md:px-16 py-16 md:py-24 max-w-7xl mx-auto">
      <h2 className="font-serif text-5xl mb-10 border-b border-[#222222] pb-5 text-[#F5F5F5]">Capabilities.</h2>
      <div className="space-y-16">
        {SKILL_CATEGORIES.map((category, idx) => (
          <div key={idx}>
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-xl font-bold text-[#F5F5F5]">{category.title}</h3>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {category.skills.map((skill, sIdx) => (
                <button
                  key={sIdx}
                  onClick={() => onSelectSkill(skill)}
                  className="text-left p-6 border border-[#222222] bg-[#0A0A0A] hover:border-[#D4AF37] transition-colors duration-300"
                >
                  <h4 className="text-sm uppercase tracking-wider font-semibold text-[#F5F5F5] mb-2">{skill.name}</h4>
                  <p className="text-xs text-[#A3A3A3] mb-5 line-clamp-2 font-light">{skill.description}</p>
                  <div className="w-full bg-[#222222] h-1">
                    <div 
                      className="bg-[#D4AF37] h-full" 
                      style={{ width: `${skill.level}%` }} 
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsSection({ onSelectProject }: { onSelectProject: (project: any) => void }) {
  return (
    <div className="px-6 md:px-16 py-16 md:py-24 max-w-7xl mx-auto">
      <h2 className="font-serif text-5xl mb-10 border-b border-[#222222] pb-5 text-[#F5F5F5]">Select Works.</h2>
      <div className="grid md:grid-cols-2 gap-10">
        {PROJECTS.map((project) => (
          <button
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="group text-left border border-[#222222] bg-[#0A0A0A] hover:border-[#D4AF37] transition-colors duration-300 flex flex-col"
          >
            <div className="relative h-60 bg-[#111111] overflow-hidden w-full">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="font-serif text-2xl text-[#F5F5F5] mb-2">{project.title}</h3>
              <p className="text-sm text-[#A3A3A3] font-light">{project.shortDesc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ExperienceSection() {
  return (
    <div className="px-6 md:px-16 py-16 md:py-24 max-w-7xl mx-auto">
      <h2 className="font-serif text-5xl mb-10 border-b border-[#222222] pb-5 text-[#F5F5F5]">Journal.</h2>
      <div className="max-w-3xl">
        {EXPERIENCE.map((exp, i) => (
          <div key={i} className="grid md:grid-cols-[180px_1fr] gap-4 mb-12">
            <div className="text-[13px] font-bold text-[#D4AF37] uppercase tracking-wider pt-1">
              {exp.period}
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#F5F5F5] mb-1">{exp.role}</h3>
              <p className="text-sm text-[#A3A3A3] mb-4">{exp.company}</p>
              <ul className="space-y-2">
                {exp.achievements.map((ach, j) => (
                  <li key={j} className="text-sm text-[#A3A3A3] leading-relaxed font-light">
                    {ach}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to send message.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('A network error occurred. Please try again.');
    }
  };

  return (
    <div className="px-6 md:px-16 py-16 md:py-24 max-w-7xl mx-auto">
      <h2 className="font-serif text-5xl mb-10 border-b border-[#222222] pb-5 text-[#F5F5F5]">Say Hello.</h2>
      <div className="grid md:grid-cols-2 gap-16">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#A3A3A3] mb-2">Your Name</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 border border-[#222222] bg-[#0A0A0A] text-[#F5F5F5] outline-none focus:border-[#D4AF37] transition-colors"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#A3A3A3] mb-2">Your Email</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 border border-[#222222] bg-[#0A0A0A] text-[#F5F5F5] outline-none focus:border-[#D4AF37] transition-colors"
              placeholder="jane@example.com"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#A3A3A3] mb-2">Message</label>
            <textarea 
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full p-3 border border-[#222222] bg-[#0A0A0A] text-[#F5F5F5] outline-none focus:border-[#D4AF37] transition-colors resize-none"
              placeholder="What's on your mind?"
            />
          </div>
          
          {status === 'success' && (
            <div className="p-4 border border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10 text-sm">
              Message sent successfully! I'll get back to you soon.
            </div>
          )}
          
          {status === 'error' && (
            <div className="p-4 border border-red-900 text-red-400 bg-red-900/10 text-sm">
              {errorMessage}
            </div>
          )}

          <button 
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-[#D4AF37] text-[#050505] px-8 py-4 text-[13px] uppercase tracking-wider font-semibold border border-[#D4AF37] hover:bg-transparent hover:text-[#D4AF37] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Message'}
          </button>
        </form>
        
        <div>
          <p className="text-lg leading-relaxed text-[#F5F5F5] mb-10 font-light">
            Interested in collaborating or just want to chat about engineering and design? Reach out directly.
          </p>
          <div className="mb-8">
            <p className="text-[11px] uppercase tracking-wider text-[#A3A3A3] mb-1">Email</p>
            <p className="font-bold text-[#D4AF37]">{PERSONAL_INFO.email}</p>
          </div>
          <div className="flex gap-6 text-[13px] font-semibold uppercase tracking-wider">
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-[#A3A3A3] hover:text-[#D4AF37] transition-colors">LinkedIn</a>
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-[#A3A3A3] hover:text-[#D4AF37] transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Modals ---

function SkillModal({ skill, onClose }: { skill: any, onClose: () => void }) {
  return (
    <AnimatePresence>
      {skill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#050505]/90 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-[#0A0A0A] border border-[#222222] p-10"
          >
            <button 
              onClick={onClose} 
              className="absolute top-6 right-6 text-[#A3A3A3] hover:text-[#D4AF37] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-3xl text-[#F5F5F5] mb-4 pr-8">{skill.name}</h3>
            <p className="text-sm text-[#A3A3A3] mb-10 leading-relaxed font-light">{skill.description}</p>
            
            <div className="space-y-3">
              <div className="flex justify-between text-[11px] uppercase tracking-wider font-semibold text-[#F5F5F5]">
                <span>Proficiency Level</span>
                <span className="text-[#D4AF37]">{skill.level}%</span>
              </div>
              <div className="h-1 w-full bg-[#222222]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  className="h-full bg-[#D4AF37]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function ProjectModal({ project, onClose }: { project: any, onClose: () => void }) {
  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#050505]/90 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="relative w-full max-w-3xl bg-[#0A0A0A] border border-[#222222] max-h-[90vh] flex flex-col"
          >
            <div className="relative h-64 sm:h-80 shrink-0 bg-[#111111] border-b border-[#222222]">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale opacity-80"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={onClose} 
                className="absolute top-6 right-6 text-[#F5F5F5] bg-[#050505]/50 backdrop-blur-md border border-[#222222] p-2 hover:text-[#D4AF37] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8 sm:p-10 overflow-y-auto">
              <h3 className="font-serif text-4xl text-[#F5F5F5] mb-8">{project.title}</h3>
              <div className="space-y-8">
                <div>
                  <h4 className="text-[11px] uppercase tracking-wider font-bold text-[#D4AF37] mb-3">Overview</h4>
                  <p className="text-sm text-[#A3A3A3] leading-relaxed font-light">{project.fullDesc}</p>
                </div>
                
                <div>
                  <h4 className="text-[11px] uppercase tracking-wider font-bold text-[#D4AF37] mb-3">Outcome</h4>
                  <p className="text-sm text-[#A3A3A3] leading-relaxed font-light">{project.outcome}</p>
                </div>

                <div>
                  <h4 className="text-[11px] uppercase tracking-wider font-bold text-[#D4AF37] mb-4">Tools & Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 border border-[#222222] text-[#A3A3A3] text-[11px] uppercase tracking-wider font-semibold">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-[#222222]">
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#D4AF37] text-[#050505] text-[13px] uppercase tracking-wider font-semibold border border-[#D4AF37] hover:bg-transparent hover:text-[#D4AF37] transition-colors w-full sm:w-auto"
                >
                  Visit Project <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// --- AI Chat Component ---

function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: "Hello. I am the AI concierge for Rohith's portfolio. How may I assist you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const systemInstruction = `You are an elegant, professional AI assistant for Rohith Kumar's luxury portfolio website. 
      Answer questions about his experience, skills, and projects based ONLY on the following data:
      ${JSON.stringify({PERSONAL_INFO, SKILL_CATEGORIES, PROJECTS, EXPERIENCE})}
      Keep your answers concise, polite, and maintain a sophisticated, high-end tone. Do not hallucinate information not provided.`;

      const contents = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      contents.push({ role: 'user', parts: [{ text: userMessage }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: { systemInstruction }
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || "I apologize, I am unable to respond at the moment." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, but I encountered an error connecting to my knowledge base." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-[#D4AF37] text-[#050505] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform z-40 ${isOpen ? 'hidden' : ''}`}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-[350px] h-[500px] bg-[#0A0A0A] border border-[#222222] shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-[#222222] flex justify-between items-center bg-[#050505]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
                <span className="font-serif text-[#D4AF37] font-semibold text-sm tracking-wider uppercase">AI Concierge</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 text-sm leading-relaxed font-light ${
                    msg.role === 'user' 
                      ? 'bg-[#D4AF37] text-[#050505]' 
                      : 'bg-[#111111] text-[#F5F5F5] border border-[#222222]'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#111111] border border-[#222222] p-3 text-[#D4AF37]">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSend} className="p-4 border-t border-[#222222] bg-[#050505] flex gap-2">
              <input 
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about my experience..."
                className="flex-1 bg-transparent border border-[#222222] text-[#F5F5F5] placeholder-[#A3A3A3] p-2 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors font-light"
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-[#D4AF37] text-[#050505] p-2 disabled:opacity-50 hover:bg-[#C5A059] transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
