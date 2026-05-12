import { motion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiDownload,
  FiArrowRight,
} from "react-icons/fi";
import { HiLocationMarker } from "react-icons/hi";
import { BsCircleFill } from "react-icons/bs";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import { SOCIAL_LINKS } from "../constants";
import profileImg from "../assets/images/profile.jpg";

// ─── Animation Variants ───────────────────────────────────────────────
// We define animation variants OUTSIDE the component so they don't
// get recreated on every render. This is a performance best practice.

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    // staggerChildren = each child animates with a delay between them
    // This creates the "cascade" reveal effect
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

// ─── Floating Orb ────────────────────────────────────────────────────
// These are the blurred green/lime circles in the background
// Exactly like the Dribbble inspiration design

function FloatingOrb({ className, delay = 0 }) {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0], // floats up and down
        scale: [1, 1.05, 1], // subtle breathing scale
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity, // loops forever
        ease: "easeInOut",
      }}
      className={className}
    />
  );
}

// ─── Social Link ─────────────────────────────────────────────────────
function SocialLink({ href, icon: Icon, label }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-4 py-2 rounded-btn border border-border text-text-secondary hover:text-accent hover:border-accent transition-all duration-200 text-sm"
    >
      <Icon size={16} />
      <span>{label}</span>
    </motion.a>
  );
}

// ─── Tech Badge ───────────────────────────────────────────────────────
// The small tech stack pills shown in the hero
const HERO_TECHS = [
  "React",
  "Next.js",
  "Node.js",
  "Laravel",
  "Vue.js",
  "TailwindCSS",
  "MySQL",
  "Firebase",
  "MongoDB",
];

// ─── Main Hero Component ──────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-bg-primary">
      {/* ── BACKGROUND FLOATING ORBS ── */}
      {/* position: absolute takes them out of flow, z-0 keeps them behind content */}
      <FloatingOrb
        delay={0}
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-accent/10 blur-3xl pointer-events-none"
      />
      <FloatingOrb
        delay={2}
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none"
      />
      <FloatingOrb
        delay={4}
        className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-accent/5 blur-2xl pointer-events-none"
      />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* ══ LEFT COLUMN — Text Content ══ */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Availability Badge */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2"
            >
              <span className="flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-medium">
                <BsCircleFill size={8} className="animate-pulse" />
                Available for work
              </span>
            </motion.div>

            {/* Name + Role */}
            <motion.div variants={itemVariants}>
              <p className="text-text-secondary text-sm font-medium mb-2 tracking-widest uppercase">
                Hello, I'm
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-text-primary leading-tight">
                Oluwatobiloba
                <br />
                <span className="text-accent">Bamidele-Nelly</span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-text-secondary mt-2">
                Full-Stack Developer
              </p>
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              className="text-text-secondary text-base leading-relaxed max-w-lg"
            >
              A driven IT professional from Lagos, Nigeria. Passionate about
              building responsive, user-focused digital solutions with the MERN
              stack, React, Vue, and Laravel. HNG Internship alumnus.
            </motion.p>

            {/* Location */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 text-text-muted text-sm"
            >
              <HiLocationMarker className="text-accent" size={16} />
              <span>Lagos State, Nigeria</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3"
            >
              <Button as="a" href="#projects" size="md">
                View My Work
                <FiArrowRight size={16} />
              </Button>

              <Button
                variant="outline"
                as="a"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                size="md"
              >
                <FiDownload size={16} />
                Download CV
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3"
            >
              <SocialLink
                href={SOCIAL_LINKS.github}
                icon={FiGithub}
                label="GitHub"
              />
              <SocialLink
                href={`https://${SOCIAL_LINKS.linkedin}`}
                icon={FiLinkedin}
                label="LinkedIn"
              />
              <SocialLink
                href={`mailto:${SOCIAL_LINKS.email}`}
                icon={FiMail}
                label="Email"
              />
            </motion.div>

            {/* Tech Stack Badges */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2"
            >
              {HERO_TECHS.map((tech, i) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.05 }}
                >
                  <Badge variant="dark">{tech}</Badge>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ══ RIGHT COLUMN — Photo + Info Cards ══ */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="relative flex flex-col items-center gap-4 lg:items-stretch"
          >
            {/* ── DESKTOP LAYOUT: Photo left, Cards right in a grid ── */}
            {/* ── MOBILE LAYOUT: Photo on top, cards grid below ── */}

            {/* Profile Photo — full width on desktop to fill space */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-xs sm:max-w-sm lg:max-w-none rounded-2xl overflow-hidden border border-border"
              style={{maxHeight: "530px"}}
            >
              <img
                src={profileImg}
                alt="Oluwatobiloba Bamidele-Nelly"
                className="w-full h-full object-cover object-top"
              />
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-accent/20" />
              {/* Bottom gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-bg-primary/70 to-transparent" />
            </motion.div>

            {/* ── INFO CARDS GRID ── */}
            {/* 
    Mobile: shows below photo, ABOVE scroll indicator (pb-16 on section handles space)
    Desktop: clean 2x2 grid below the photo, fills same width as photo
  */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-xs sm:max-w-sm lg:max-w-none">
              {/* Education Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <Card className="p-4 h-full">
                  <Badge variant="accent" className="mb-2 text-xs">
                    Education
                  </Badge>
                  <p className="text-text-primary text-xs font-semibold leading-snug">
                    B.Sc. Computer Science
                  </p>
                  <p className="text-text-muted text-xs mt-1">
                    Lead City University
                  </p>
                  <p className="text-text-muted text-xs">2021 – 2025</p>
                </Card>
              </motion.div>

              {/* Experience Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <Card className="p-4 h-full">
                  <Badge variant="accent" className="mb-2 text-xs">
                    Experience
                  </Badge>
                  <p className="text-text-primary text-xs font-semibold leading-snug">
                    Frontend Intern
                  </p>
                  <p className="text-text-muted text-xs mt-1">HNG Internship</p>
                  <p className="text-text-muted text-xs">Oct – Dec 2025</p>
                </Card>
              </motion.div>

              {/* Skills Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <Card className="p-4 h-full">
                  <Badge variant="accent" className="mb-2 text-xs">
                    Skills
                  </Badge>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    React · Next.js · Node.js · Laravel · Vue.js · MongoDB
                  </p>
                </Card>
              </motion.div>

              {/* Resume Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <Card className="p-4 h-full">
                  <Badge variant="accent" className="mb-2 text-xs">
                    Resume
                  </Badge>
                  <p className="text-text-secondary text-xs mb-3">
                    Download my resume as PDF
                  </p>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-accent text-xs font-semibold hover:underline"
                  >
                    <FiDownload size={12} />
                    Download (PDF)
                  </a>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden lg:flex"
      >
        <span className="text-text-muted text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-accent to-transparent"
        />
      </motion.div>
    </section>
  );
}

export default Hero;
