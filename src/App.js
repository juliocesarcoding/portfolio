import { useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a0f;
    --bg2: #111118;
    --bg3: #16161f;
    --line: rgba(255,255,255,0.07);
    --line2: rgba(255,255,255,0.13);
    --accent: #4fffb0;
    --accent2: #00d4ff;
    --accent3: #b06fff;
    --text: #e8e8f0;
    --muted: #8888a0;
    --faint: #444458;
    --font-display: 'Syne', sans-serif;
    --font-mono: 'DM Mono', monospace;
    --font-body: 'DM Sans', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.7;
    overflow-x: hidden;
  }

  ::selection { background: var(--accent); color: #000; }

  .portfolio-wrap::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 1000;
    opacity: 0.4;
  }

  .p-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 1.25rem 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--line);
    background: rgba(10,10,15,0.85);
    backdrop-filter: blur(16px);
  }

  .p-nav-logo {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 1.1rem;
    letter-spacing: -0.02em;
    color: var(--text);
    text-decoration: none;
  }

  .p-nav-logo span { color: var(--accent); }

  .p-nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
  }

  .p-nav-links a {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--muted);
    text-decoration: none;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: color 0.2s;
  }

  .p-nav-links a:hover { color: var(--accent); }

  .p-nav-cta {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    padding: 0.5rem 1.25rem;
    border: 1px solid var(--accent);
    color: var(--accent);
    text-decoration: none;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: all 0.2s;
  }

  .p-nav-cta:hover { background: var(--accent); color: #000; }

  .p-hero {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    padding: 8rem 2.5rem 4rem;
    position: relative;
    overflow: hidden;
  }

  .p-hero-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 70% 50%, rgba(79,255,176,0.06) 0%, transparent 60%),
      radial-gradient(ellipse 40% 60% at 20% 80%, rgba(176,111,255,0.05) 0%, transparent 50%);
    pointer-events: none;
  }

  .p-hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(var(--line) 1px, transparent 1px),
      linear-gradient(90deg, var(--line) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
    pointer-events: none;
  }

  .p-hero-left { position: relative; z-index: 2; }

  .p-hero-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--accent);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
    opacity: 0;
    animation: fadeUp 0.6s ease 0.2s forwards;
  }

  .p-hero-tag::before {
    content: '';
    width: 24px; height: 1px;
    background: var(--accent);
  }

  .p-hero-name {
    font-family: var(--font-display);
    font-size: clamp(3rem, 5vw, 5rem);
    font-weight: 800;
    line-height: 1.0;
    letter-spacing: -0.03em;
    color: var(--text);
    margin-bottom: 0.5rem;
    opacity: 0;
    animation: fadeUp 0.6s ease 0.35s forwards;
  }

  .p-hero-title {
    font-family: var(--font-display);
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    font-weight: 600;
    color: var(--muted);
    margin-bottom: 1.75rem;
    opacity: 0;
    animation: fadeUp 0.6s ease 0.5s forwards;
  }

  .p-hero-title span { color: var(--accent); }

  .p-hero-desc {
    font-size: 1rem;
    color: var(--muted);
    max-width: 480px;
    line-height: 1.8;
    margin-bottom: 2.5rem;
    font-weight: 300;
    opacity: 0;
    animation: fadeUp 0.6s ease 0.65s forwards;
  }

  .p-hero-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    opacity: 0;
    animation: fadeUp 0.6s ease 0.8s forwards;
  }

  .p-btn-primary {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.85rem 2rem;
    background: var(--accent);
    color: #000;
    text-decoration: none;
    transition: all 0.2s;
    display: inline-block;
  }

  .p-btn-primary:hover { background: #fff; transform: translateY(-2px); }

  .p-btn-secondary {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.85rem 2rem;
    border: 1px solid var(--faint);
    color: var(--muted);
    text-decoration: none;
    transition: all 0.2s;
    display: inline-block;
  }

  .p-btn-secondary:hover { border-color: var(--text); color: var(--text); transform: translateY(-2px); }

  .p-hero-right {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    opacity: 0;
    animation: fadeIn 1s ease 0.9s forwards;
  }

  .p-hero-card {
    background: var(--bg3);
    border: 1px solid var(--line2);
    padding: 2rem;
    width: 320px;
  }

  .p-hero-card-label {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--faint);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 1.25rem;
  }

  .p-stat-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--line);
  }

  .p-stat-row:last-child { border-bottom: none; }

  .p-stat-label {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--muted);
    letter-spacing: 0.05em;
  }

  .p-stat-value {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--accent);
  }

  .p-availability {
    margin-top: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--accent);
    letter-spacing: 0.05em;
  }

  .p-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: var(--accent);
    animation: pulse 2s ease infinite;
  }

  .p-section {
    padding: 6rem 2.5rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .p-section-border {
    border-top: 1px solid var(--line);
  }

  .p-section-label {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--accent);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .p-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--line2);
    max-width: 60px;
  }

  .p-section-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin-bottom: 3rem;
    color: var(--text);
  }

  .p-skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1px;
    background: var(--line);
    border: 1px solid var(--line);
  }

  .p-skill-block {
    background: var(--bg);
    padding: 1.75rem;
    transition: background 0.2s;
  }

  .p-skill-block:hover { background: var(--bg3); }

  .p-skill-block-icon {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--accent);
    letter-spacing: 0.1em;
    margin-bottom: 0.75rem;
    text-transform: uppercase;
  }

  .p-skill-block-title {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 0.75rem;
  }

  .p-skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .p-tag {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    padding: 0.25rem 0.6rem;
    background: var(--bg2);
    border: 1px solid var(--line2);
    color: var(--muted);
    letter-spacing: 0.03em;
  }

  .p-tag-accent {
    border-color: rgba(79,255,176,0.3);
    color: var(--accent);
    background: rgba(79,255,176,0.05);
  }

  .p-exp-list { display: flex; flex-direction: column; }

  .p-exp-item {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 2rem;
    padding: 2.5rem 0;
    border-bottom: 1px solid var(--line);
  }

  .p-exp-item:first-child { border-top: 1px solid var(--line); }

  .p-exp-period {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--muted);
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }

  .p-exp-company {
    font-family: var(--font-display);
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--accent);
    margin-bottom: 0.25rem;
  }

  .p-exp-location {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--faint);
    letter-spacing: 0.05em;
  }

  .p-exp-title {
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }

  .p-exp-bullets {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .p-exp-bullets li {
    font-size: 0.9rem;
    color: var(--muted);
    padding-left: 1.25rem;
    position: relative;
    font-weight: 300;
    line-height: 1.6;
  }

  .p-exp-bullets li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--accent);
    font-size: 0.8rem;
  }

  .p-projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1px;
    background: var(--line);
    border: 1px solid var(--line);
  }

  .p-project-card {
    background: var(--bg);
    padding: 2rem;
    transition: background 0.2s;
  }

  .p-project-card:hover { background: var(--bg3); }

  .p-project-tag {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--accent3);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  .p-project-title {
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 0.75rem;
  }

  .p-project-desc {
    font-size: 0.88rem;
    color: var(--muted);
    line-height: 1.7;
    font-weight: 300;
    margin-bottom: 1.25rem;
  }

  .p-contact-section {
    border-top: 1px solid var(--line);
    padding: 6rem 2.5rem;
    text-align: center;
    background: var(--bg2);
  }

  .p-contact-inner { max-width: 640px; margin: 0 auto; }

  .p-contact-title {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.0;
    margin-bottom: 1.25rem;
    color: var(--text);
  }

  .p-contact-title span { color: var(--accent); }

  .p-contact-sub {
    font-size: 1rem;
    color: var(--muted);
    font-weight: 300;
    margin-bottom: 2.5rem;
  }

  .p-contact-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .p-contact-link {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.85rem 1.75rem;
    border: 1px solid var(--line2);
    color: var(--muted);
    text-decoration: none;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .p-contact-link:hover { border-color: var(--accent); color: var(--accent); }
  .p-contact-link-primary { border-color: var(--accent) !important; color: var(--accent) !important; }
  .p-contact-link-primary:hover { background: var(--accent) !important; color: #000 !important; }

  .p-footer {
    padding: 1.5rem 2.5rem;
    border-top: 1px solid var(--line);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .p-footer span {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--faint);
    letter-spacing: 0.08em;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }

  .p-reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }

  .p-reveal.p-visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    .p-nav { padding: 1rem 1.25rem; }
    .p-nav-links { display: none; }
    .p-hero { grid-template-columns: 1fr; padding: 7rem 1.25rem 3rem; }
    .p-hero-right { display: none; }
    .p-section { padding: 4rem 1.25rem; }
    .p-exp-item { grid-template-columns: 1fr; gap: 0.5rem; }
    .p-contact-section { padding: 4rem 1.25rem; }
    .p-footer { flex-direction: column; gap: 0.5rem; text-align: center; }
  }
`;

const skills = [
 {
  icon: "Core",
  title: "Backend",
  tags: ["Node.js", "NestJS", ".NET Core", "Laravel", "Spring Boot", "Java"],
  accents: ["Node.js", "NestJS"],
 },
 {
  icon: "Data",
  title: "Databases",
  tags: [
   "SQL Server",
   "Oracle",
   "MongoDB",
   "MySQL",
   "ElasticSearch",
   "ETL / Pentaho",
  ],
  accents: ["SQL Server", "Oracle"],
 },
 {
  icon: "Infra",
  title: "Cloud & DevOps",
  tags: ["AWS", "Docker", "CI/CD", "Containerization", "Git"],
  accents: ["AWS", "Docker"],
 },
 {
  icon: "Interfaces",
  title: "Frontend",
  tags: ["ReactJS", "Next.js", "Vue.js", "Tailwind CSS"],
  accents: [],
 },
 {
  icon: "Integration",
  title: "APIs & Protocols",
  tags: [
   "REST",
   "SOAP",
   "GraphQL",
   "WebSockets",
   "Webhooks",
   "Real-time Sync",
  ],
  accents: ["REST", "SOAP"],
 },
 {
  icon: "Domain",
  title: "Business Systems",
  tags: [
   "ERP Integrations",
   "SaaS Architecture",
   "Fiscal APIs",
   "Multi-tenant",
   "Financial Systems",
  ],
  accents: ["ERP Integrations"],
 },
];

const experience = [
 {
  period: "Sep 2024 — Present",
  company: "Destemido Sistemas",
  location: "Curitiba · Remote",
  title: "Technology Consultant",
  bullets: [
   "Architected a multi-tenant SaaS invoicing platform integrating fiscal document APIs (PlugNotas), automating NF-e issuance and reducing manual financial operations by ~70%.",
   "Designed enterprise-grade auth flows — 2FA and token-based systems — for secure multi-tenant access.",
   "Built SOAP-based API integrations with enterprise systems ensuring real-time data synchronization.",
  ],
 },
 {
  period: "Jan 2024 — Present",
  company: "Integra Tech",
  location: "Curitiba · Founder",
  title: "Founder & Full Stack Engineer",
  bullets: [
   "Founded a software consultancy delivering production systems for enterprise clients across pricing, logistics, and automation.",
   "Built a real-time pricing engine with automated propagation across sales channels — reducing pricing lag from days to seconds.",
   "Implemented real-time sync pipelines using polling and push notification strategies for live operational data.",
   "Developed a game server management platform with Valve API integration, real-time player tracking, and automated match orchestration.",
  ],
 },
 {
  period: "Feb 2022 — Sep 2024",
  company: "Pneuzão",
  location: "Curitiba",
  title: "Full Stack Engineer",
  bullets: [
   "Led full cloud migration from on-premise infrastructure to AWS, improving availability and reducing operational overhead.",
   "Built end-to-end automation connecting back-office systems with e-commerce platforms, eliminating manual operations.",
   "Led a backend development team delivering integrations and internal tooling aligned with business workflows.",
  ],
 },
 {
  period: "Oct 2020 — Sep 2024",
  company: "RS Pneus",
  location: "Curitiba",
  title: "Full Stack Engineer / Systems Analyst",
  bullets: [
   "Designed high-performance database schemas on SQL Server and Oracle for business-critical operations at scale.",
   "Built and maintained REST and SOAP API integrations ensuring data integrity across internal and external systems.",
   "Implemented CI/CD pipelines with Docker, reducing deployment cycle time and improving release reliability.",
   "Developed .NET Core APIs for financial reconciliation, inventory management, and critical business workflows.",
  ],
 },
 {
  period: "Jul 2019 — Sep 2020",
  company: "Grupo Livrarias Curitiba",
  location: "Curitiba",
  title: "Systems Analyst Jr.",
  bullets: [
   "Built integrations connecting back-office platforms with WMS and marketplace/e-commerce systems.",
   "Delivered full-stack solutions in C#, ASP.NET, Java/Spring Boot, Vue.js, Node.js, and ElasticSearch.",
   "Managed ETL pipelines and Data Warehouse routines using Pentaho Data Integration.",
  ],
 },
 {
  period: "Mar 2013 — Apr 2018",
  company: "Grupo Poliservice",
  location: "Curitiba",
  title: "IT Developer",
  bullets: [
   "Promoted from IT intern to developer — built process automation, business rules engines, and workflow tooling for enterprise operations.",
   "Managed server infrastructure, backup routines, and cross-departmental IT systems for a multi-site enterprise group.",
  ],
 },
];

const projects = [
 {
  tag: "SaaS · Fintech",
  title: "Invoicing & Fiscal Automation Platform",
  desc:
   "Multi-tenant SaaS platform automating NF-e issuance via PlugNotas API integration. Reduced manual financial operations by ~70% for enterprise clients.",
  stack: ["NestJS", "Node.js", "SOAP", "2FA Auth", "Multi-tenant"],
 },
 {
  tag: "Real-time · Pricing",
  title: "Real-time Pricing Engine",
  desc:
   "Automated pricing propagation system integrated with enterprise back-office. Reduced pricing lag from days to seconds across all sales channels.",
  stack: ["Node.js", "REST APIs", "WebSockets", "SQL Server"],
 },
 {
  tag: "Infrastructure · Cloud",
  title: "AWS Cloud Migration",
  desc:
   "Led full on-premise to AWS migration for a mid-size retail company. Improved system availability and eliminated single points of failure.",
  stack: ["AWS", "Docker", "CI/CD", "Linux"],
 },
 {
  tag: "Data · Analytics",
  title: "Purchasing Analytics System",
  desc:
   "Data-driven procurement decision system with real-time sync pipelines, supporting multi-department purchasing with live operational data.",
  stack: ["Node.js", "ETL", "Oracle", "Pentaho"],
 },
 {
  tag: "Gaming · Real-time",
  title: "Game Server Management Platform",
  desc:
   "Server platform with Valve API integration, real-time player tracking, ranking systems, and automated match orchestration via Discord bot.",
  stack: ["Node.js", "Valve API", "Discord API", "WebSockets"],
 },
 {
  tag: "E-commerce · Integration",
  title: "Back-office → Marketplace Integration",
  desc:
   "End-to-end automation connecting legacy back-office systems with WMS and e-commerce platforms across multiple marketplace channels.",
  stack: ["Node.js", "SOAP", "REST", "ElasticSearch"],
 },
];

function App() {
 const revealRefs = useRef([]);

 useEffect(() => {
  // inject styles
  const styleEl = document.createElement("style");
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  // scroll reveal
  const observer = new IntersectionObserver(
   (entries) => {
    entries.forEach((entry, i) => {
     if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add("p-visible"), i * 80);
      observer.unobserve(entry.target);
     }
    });
   },
   { threshold: 0.1 }
  );

  document.querySelectorAll(".p-reveal").forEach((el) => observer.observe(el));

  return () => {
   document.head.removeChild(styleEl);
   observer.disconnect();
  };
 }, []);

 return (
  <div className="portfolio-wrap">
   {/* NAV */}
   <nav className="p-nav">
    <a href="#top" className="p-nav-logo">
     JC<span>.</span>
    </a>
    <ul className="p-nav-links">
     <li>
      <a href="#skills">Skills</a>
     </li>
     <li>
      <a href="#experience">Experience</a>
     </li>
     <li>
      <a href="#projects">Projects</a>
     </li>
     <li>
      <a href="#contact">Contact</a>
     </li>
    </ul>
    <a href="mailto:julio.wisnieski@gmail.com" className="p-nav-cta">
     Hire me
    </a>
   </nav>

   {/* HERO */}
   <div className="p-hero" id="top">
    <div className="p-hero-bg" />
    <div className="p-hero-grid" />

    <div className="p-hero-left">
     <div className="p-hero-tag">Available for remote · June 2026</div>
     <h1 className="p-hero-name">
      Julio Cesar
      <br />
      de Oliveira
     </h1>
     <p className="p-hero-title">
      Backend Engineer · <span>Node.js · NestJS · AWS</span>
     </p>
     <p className="p-hero-desc">
      10+ years building high-performance APIs, scalable distributed systems,
      and cloud-native architectures for enterprise clients. Deep expertise in
      complex integrations, real-time data pipelines, and SaaS product
      delivery.
     </p>
     <div className="p-hero-actions">
      <a href="#experience" className="p-btn-primary">
       View Experience
      </a>
      <a href="#contact" className="p-btn-secondary">
       Get in Touch
      </a>
     </div>
    </div>

    <div className="p-hero-right">
     <div className="p-hero-card">
      <div className="p-hero-card-label">// career snapshot</div>
      {[
       { label: "Years of experience", value: "10+" },
       { label: "Companies served", value: "6+" },
       { label: "Cloud migrations led", value: "1" },
       { label: "Location", value: "Curitiba, BR", small: true },
      ].map((s) => (
       <div className="p-stat-row" key={s.label}>
        <span className="p-stat-label">{s.label}</span>
        <span
         className="p-stat-value"
         style={s.small ? { fontSize: "0.95rem" } : {}}
        >
         {s.value}
        </span>
       </div>
      ))}
      <div className="p-availability">
       <span className="p-dot" />
       Open to remote · worldwide
      </div>
     </div>
    </div>
   </div>

   {/* SKILLS */}
   <section className="p-section" id="skills">
    <div className="p-section-label p-reveal">01 — Expertise</div>
    <h2 className="p-section-title p-reveal">Technical Skills</h2>
    <div className="p-skills-grid p-reveal">
     {skills.map((s) => (
      <div className="p-skill-block" key={s.title}>
       <div className="p-skill-block-icon">{s.icon}</div>
       <div className="p-skill-block-title">{s.title}</div>
       <div className="p-skill-tags">
        {s.tags.map((t) => (
         <span
          key={t}
          className={`p-tag${s.accents.includes(t) ? " p-tag-accent" : ""}`}
         >
          {t}
         </span>
        ))}
       </div>
      </div>
     ))}
    </div>
   </section>

   {/* EXPERIENCE */}
   <section className="p-section p-section-border" id="experience">
    <div className="p-section-label p-reveal">02 — Career</div>
    <h2 className="p-section-title p-reveal">Experience</h2>
    <div className="p-exp-list">
     {experience.map((e) => (
      <div className="p-exp-item p-reveal" key={e.company + e.period}>
       <div className="p-exp-meta">
        <div className="p-exp-period">{e.period}</div>
        <div className="p-exp-company">{e.company}</div>
        <div className="p-exp-location">{e.location}</div>
       </div>
       <div className="p-exp-content">
        <div className="p-exp-title">{e.title}</div>
        <ul className="p-exp-bullets">
         {e.bullets.map((b, i) => (
          <li key={i}>{b}</li>
         ))}
        </ul>
       </div>
      </div>
     ))}
    </div>
   </section>

   {/* PROJECTS */}
   <section className="p-section p-section-border" id="projects">
    <div className="p-section-label p-reveal">03 — Work</div>
    <h2 className="p-section-title p-reveal">Notable Projects</h2>
    <div className="p-projects-grid p-reveal">
     {projects.map((p) => (
      <div className="p-project-card" key={p.title}>
       <div className="p-project-tag">{p.tag}</div>
       <div className="p-project-title">{p.title}</div>
       <p className="p-project-desc">{p.desc}</p>
       <div className="p-skill-tags">
        {p.stack.map((t) => (
         <span key={t} className="p-tag">
          {t}
         </span>
        ))}
       </div>
      </div>
     ))}
    </div>
   </section>

   {/* CONTACT */}
   <div className="p-contact-section" id="contact">
    <div className="p-contact-inner p-reveal">
     <h2 className="p-contact-title">
      Let's work
      <br />
      <span>together.</span>
     </h2>
     <p className="p-contact-sub">
      Available for full-time remote positions worldwide. Open to contract and
      freelance engagements.
     </p>
     <div className="p-contact-links">
      <a
       href="mailto:julio.wisnieski@gmail.com"
       className="p-contact-link p-contact-link-primary"
      >
       julio.wisnieski@gmail.com
      </a>
      <a
       href="https://linkedin.com/in/julio-cesar-deoliveira-945723b9"
       className="p-contact-link"
       target="_blank"
       rel="noopener noreferrer"
      >
       LinkedIn
      </a>
      <a
       href="https://github.com/jcwisniewski"
       className="p-contact-link"
       target="_blank"
       rel="noopener noreferrer"
      >
       GitHub
      </a>
     </div>
    </div>
   </div>

   {/* FOOTER */}
   <footer className="p-footer">
    <span>Julio Cesar de Oliveira · Backend Engineer</span>
    <span>Curitiba, Brazil · Available June 2026</span>
   </footer>
  </div>
 );
}

export default App;
