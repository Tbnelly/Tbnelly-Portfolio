// Each project is a self-contained object.
// Adding a new project = adding one object to this array.
// The UI reads this array and renders automatically.

export const projects = [
  {
    id: 'audiophile',
    title: 'Audiophile E-Commerce',
    description:
      'A fully responsive e-commerce website with cart management, checkout validation, VAT calculation, and persistent LocalStorage cart.',
    tech: ['React', 'LocalStorage', 'TailwindCSS', 'Vite'],
    github: 'https://github.com/Tbnelly/audiophile-ecommerce',
    live: 'https://audiophile-ecommerce-1pb7.vercel.app/',
    featured: true,
    category: 'React',
    status: 'live',
  },
  {
    id: 'ticketwave',
    title: 'TicketWave',
    description:
      'A modern ticket management system with authentication, dashboard, CRUD operations, and custom toast notifications.',
    tech: ['React', 'Vue', 'Twig', 'TailwindCSS'],
    github: 'https://github.com/Tbnelly',
    live: 'https://inovice-app-two.vercel.app/',
    featured: true,
    category: 'React',
    status: 'live',
  },
  {
    id: 'forge-ui',
    title: 'Forge UI — Component Library',
    description:
      'A reusable component library built for developers. Clean, accessible, and production-ready UI components.',
    tech: ['React', 'TailwindCSS', 'JavaScript'],
    github: 'https://github.com/Tbnelly',
    live: 'https://codveda-level3-task2.vercel.app/',
    featured: true,
    category: 'React',
    status: 'live',
  },
  {
    id: 'techies-tags',
    title: 'Techies Tags',
    description:
      'A developer tagging and discovery platform. Built with a focus on clean UI and smooth user experience.',
    tech: ['React', 'Node.js', 'TailwindCSS'],
    github: 'https://github.com/Tbnelly',
    live: 'https://techiestags.com/',
    featured: false,
    category: 'NextJS',
    status: 'live',
  },
  {
    id: 'hng-profile',
    title: 'HNG Stage 0 — Profile Card',
    description:
      'A responsive and accessible profile card with live time updates, keyboard navigation, and mobile friendliness.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/Tbnelly',
    live: 'https://stage-0-hng-profile-card.vercel.app/',
    featured: false,
    category: 'JavaScript',
    status: 'live',
  },
  {
    id: 'frontend-mentor-ecommerce',
    title: 'FM — E-Commerce Product Page',
    description:
      'Pixel-perfect Frontend Mentor challenge. Responsive product page with image gallery and cart functionality.',
    tech: ['React', 'CSS', 'JavaScript'],
    github: 'https://github.com/Tbnelly',
    live: 'https://product-pgae-front-end-mentor.vercel.app/',
    featured: false,
    category: 'React',
    status: 'live',
  },
  {
    id: 'frontend-mentor-intro',
    title: 'FM — Intro with Dropdown Nav',
    description:
      'Frontend Mentor challenge featuring a responsive intro section with animated dropdown navigation.',
    tech: ['React', 'CSS', 'JavaScript'],
    github: 'https://github.com/Tbnelly',
    live: 'https://frontend-mentor-intro-section-with-dropdown-navigation-three.vercel.app/',
    featured: false,
    category: 'React',
    status: 'live',
  },
]