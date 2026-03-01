import React, { useEffect, useRef, useState } from 'react';
import './Resume.css';

// ── Navbar ──────────────────────────────────────────────────────────────────
const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = ['About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'];

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-logo">
        <span className="logo-bracket">&lt;</span>SK<span className="logo-bracket">/&gt;</span>
      </div>
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        <span /><span /><span />
      </button>
      <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
        {navLinks.map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
              <span className="nav-dot">›</span>{l}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// ── Hero ─────────────────────────────────────────────────────────────────────
const Hero: React.FC = () => {
  const [typed, setTyped] = useState('');
  const phrases = ['Cyber Security Analyst', 'SOC Enthusiast', 'Threat Hunter', 'Incident Responder'];
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    const speed = deleting ? 60 : 100;
    const timer = setTimeout(() => {
      if (!deleting) {
        setTyped(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1800);
        } else {
          setCharIdx(c => c + 1);
        }
      } else {
        setTyped(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setPhraseIdx(i => (i + 1) % phrases.length);
          setCharIdx(0);
        } else {
          setCharIdx(c => c - 1);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, phraseIdx]);

  return (
    <section id="hero" className="hero">
      <div className="hero-grid-bg" />
      <div className="hero-content">
        <div className="hero-badge animate-fadeup" style={{ animationDelay: '0.1s' }}>
          <span className="badge-dot" />Available for Opportunities
        </div>
        <h1 className="hero-name animate-fadeup" style={{ animationDelay: '0.25s' }}>
          Sudhanshu<br /><span className="name-accent">Kumar</span>
        </h1>
        <div className="hero-role animate-fadeup" style={{ animationDelay: '0.4s' }}>
          <span className="role-prefix">$ whoami &gt;&nbsp;</span>
          <span className="typed-text">{typed}</span>
          <span className="cursor">|</span>
        </div>
        <p className="hero-bio animate-fadeup" style={{ animationDelay: '0.55s' }}>
          Passionate about protecting digital infrastructure through proactive threat detection,
          security monitoring, and rapid incident response. Building expertise in SOC operations
          and cyber defence.
        </p>
        <div className="hero-actions animate-fadeup" style={{ animationDelay: '0.7s' }}>
          <a href="#contact" className="btn btn-primary">Get In Touch</a>
          <a href="#projects" className="btn btn-ghost">View Projects</a>
        </div>
        <div className="hero-stats animate-fadeup" style={{ animationDelay: '0.85s' }}>
          {[['7+', 'Security Tools'], ['SOC', 'Focused Career'], ['2023', 'Graduate']].map(([v, l]) => (
            <div className="stat" key={l}>
              <span className="stat-value">{v}</span>
              <span className="stat-label">{l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-visual">
        <div className="hex-ring outer" />
        <div className="hex-ring middle" />
        <div className="hex-ring inner" />
        <div className="avatar-circle">
          <span>SK</span>
        </div>
        <div className="orbit-dot d1" />
        <div className="orbit-dot d2" />
        <div className="orbit-dot d3" />
      </div>
    </section>
  );
};

// ── About ────────────────────────────────────────────────────────────────────
const About: React.FC = () => (
  <section id="about" className="section about">
    <div className="container">
      <SectionHeader label="01" title="About Me" />
      <div className="about-grid">
        <div className="about-text">
          <p>
            I'm <strong>Sudhanshu Kumar</strong>, a cybersecurity professional specialising in Security
            Operations Centre (SOC) analysis, threat monitoring, and incident handling. I graduated from
            <strong> Chandigarh University</strong> in 2023 with a deep focus on cyber defence.
          </p>
          <p>
            My core interest lies in <strong>Cyber Defence</strong> — actively monitoring networks,
            correlating security events through SIEM platforms, hunting for threats, and coordinating
            rapid incident response. I love digging into logs and turning raw data into actionable intelligence.
          </p>
          <p>
            I believe in continuous learning and staying ahead of evolving threats. Whether it's crafting
            detection rules, dissecting network packets, or deploying containerised security tools —
            I'm always building.
          </p>
          <div className="about-tags">
            {['SOC Operations', 'Threat Detection', 'Log Analysis', 'SIEM', 'Incident Response', 'Network Security'].map(t => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </div>
        </div>
        <div className="about-card">
          <div className="info-block">
            <div className="info-row">
              <span className="info-icon">🎓</span>
              <div>
                <span className="info-label">Education</span>
                <span className="info-value">Chandigarh University, 2023</span>
              </div>
            </div>
            <div className="info-row">
              <span className="info-icon">🛡️</span>
              <div>
                <span className="info-label">Focus Area</span>
                <span className="info-value">Cyber Defence & SOC</span>
              </div>
            </div>
            <div className="info-row">
              <span className="info-icon">🔭</span>
              <div>
                <span className="info-label">Interests</span>
                <span className="info-value">Monitoring, Incident Handling</span>
              </div>
            </div>
            <div className="info-row">
              <span className="info-icon">📍</span>
              <div>
                <span className="info-label">Location</span>
                <span className="info-value">India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ── Skills ───────────────────────────────────────────────────────────────────
const skills = [
  { name: 'ELK Stack', cat: 'SIEM', level: 85, icon: '📊' },
  { name: 'Splunk', cat: 'SIEM', level: 80, icon: '🔍' },
  { name: 'Wazuh', cat: 'SIEM', level: 78, icon: '🛡️' },
  { name: 'Nmap', cat: 'Network', level: 88, icon: '🗺️' },
  { name: 'Wireshark', cat: 'Network', level: 82, icon: '🦈' },
  { name: 'Linux', cat: 'OS', level: 90, icon: '🐧' },
  { name: 'Docker', cat: 'DevOps', level: 75, icon: '🐳' },
];

const SkillCard: React.FC<{ name: string; cat: string; level: number; icon: string }> = ({ name, cat, level, icon }) => (
  <div className="skill-card">
    <div className="skill-top">
      <span className="skill-icon">{icon}</span>
      <span className="skill-cat">{cat}</span>
    </div>
    <h3 className="skill-name">{name}</h3>
    <div className="skill-bar-bg">
      <div className="skill-bar-fill" style={{ '--level': `${level}%` } as React.CSSProperties} />
    </div>
    <span className="skill-pct">{level}%</span>
  </div>
);

const Skills: React.FC = () => (
  <section id="skills" className="section skills">
    <div className="container">
      <SectionHeader label="02" title="Skills" />
      <div className="skills-grid">
        {skills.map(s => <SkillCard key={s.name} {...s} />)}
      </div>
    </div>
  </section>
);

// ── Projects ─────────────────────────────────────────────────────────────────
const projects = [
  {
    title: 'Login System',
    desc: 'A secure authentication system built with modern security practices including hashed credentials, session management, and brute-force protection mechanisms.',
    tags: ['Authentication', 'Security', 'Web'],
    github: 'https://github.com/Unixxxxxx/login',
    status: 'Active',
  },
];

const Projects: React.FC = () => (
  <section id="projects" className="section projects">
    <div className="container">
      <SectionHeader label="03" title="Projects" />
      <div className="projects-grid">
        {projects.map(p => (
          <div className="project-card" key={p.title}>
            <div className="project-header">
              <span className="project-status">{p.status}</span>
              <span className="project-icon">⚙️</span>
            </div>
            <h3 className="project-title">{p.title}</h3>
            <p className="project-desc">{p.desc}</p>
            <div className="project-tags">
              {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
            </div>
            <a href={p.github} target="_blank" rel="noreferrer" className="project-link">
              <span className="gh-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </span>
              View on GitHub
            </a>
          </div>
        ))}
        <div className="project-card project-more">
          <div className="more-inner">
            <span className="more-icon">+</span>
            <p>More projects coming soon…</p>
            <a href="https://github.com/Unixxxxxx" target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">GitHub Profile</a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ── Experience ────────────────────────────────────────────────────────────────
const experience = [
  {
    role: 'SOC Analyst (Aspirant)',
    company: 'Self-Directed Learning & Labs',
    period: '2023 – Present',
    points: [
      'Deployed and configured ELK Stack and Wazuh for home lab SIEM environments.',
      'Performed network scanning and vulnerability assessments using Nmap.',
      'Analysed network traffic and suspicious packets with Wireshark.',
      'Built detection rules and alerts for common attack patterns.',
      'Practiced incident response workflows in simulated environments.',
    ],
  },
];

const Experience: React.FC = () => (
  <section id="experience" className="section experience">
    <div className="container">
      <SectionHeader label="04" title="Experience" />
      <div className="timeline">
        {experience.map((e, i) => (
          <div className="timeline-item" key={i}>
            <div className="timeline-dot" />
            <div className="timeline-card">
              <div className="timeline-header">
                <div>
                  <h3 className="timeline-role">{e.role}</h3>
                  <span className="timeline-company">{e.company}</span>
                </div>
                <span className="timeline-period">{e.period}</span>
              </div>
              <ul className="timeline-points">
                {e.points.map((p, j) => <li key={j}>{p}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Education ─────────────────────────────────────────────────────────────────
const Education: React.FC = () => (
  <section id="education" className="section education">
    <div className="container">
      <SectionHeader label="05" title="Education" />
      <div className="edu-card">
        <div className="edu-icon">🏛️</div>
        <div className="edu-body">
          <h3 className="edu-degree">Bachelor of Technology</h3>
          <span className="edu-school">Chandigarh University</span>
          <span className="edu-year">Class of 2023</span>
          <p className="edu-desc">
            Studied computer science with a strong focus on network security, ethical hacking,
            and defensive security practices. Built foundational expertise in cybersecurity
            concepts, cryptography, and system administration.
          </p>
          <div className="edu-tags">
            {['Network Security', 'Ethical Hacking', 'Cryptography', 'System Administration'].map(t => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ── Contact ───────────────────────────────────────────────────────────────────
const Contact: React.FC = () => (
  <section id="contact" className="section contact">
    <div className="container contact-inner">
      <SectionHeader label="06" title="Contact" centered />
      <p className="contact-sub">
        I'm actively looking for SOC Analyst and Cyber Defence roles. Let's connect!
      </p>
      <div className="contact-cards">
        {[
          { label: 'Email', value: 'sudhanshu@example.com', icon: '✉️', href: 'mailto:sudhanshu@example.com' },
          { label: 'GitHub', value: 'Unixxxxxx', icon: '💻', href: 'https://github.com/Unixxxxxx' },
          { label: 'LinkedIn', value: 'Connect with me', icon: '🔗', href: '#' },
        ].map(c => (
          <a className="contact-card" href={c.href} target="_blank" rel="noreferrer" key={c.label}>
            <span className="contact-card-icon">{c.icon}</span>
            <span className="contact-card-label">{c.label}</span>
            <span className="contact-card-value">{c.value}</span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

// ── Footer ────────────────────────────────────────────────────────────────────
const Footer: React.FC = () => (
  <footer className="footer">
    <span>Designed & built by <strong>Sudhanshu Kumar</strong></span>
    <span className="footer-sep">·</span>
    <span>Cyber Security Analyst</span>
  </footer>
);

// ── Section Header helper ─────────────────────────────────────────────────────
const SectionHeader: React.FC<{ label: string; title: string; centered?: boolean }> = ({ label, title, centered }) => (
  <div className={`section-header${centered ? ' centered' : ''}`}>
    <span className="section-num">{label}.</span>
    <h2 className="section-title">{title}</h2>
    <div className="section-line" />
  </div>
);

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

