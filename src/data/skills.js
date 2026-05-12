import {
  SiReact, SiNextdotjs, SiVuedotjs, SiJavascript,
  SiHtml5, SiCss,
  SiTailwindcss, SiNodedotjs,
  SiExpress, SiLaravel, SiPhp, SiMysql,
  SiFirebase, SiGit, SiGithub, SiVite,
  SiWordpress,  SiMongodb,
} from 'react-icons/si'

export const skillCategories = [
  {
    label: 'Frontend',
    skills: [
      { name: 'React.js', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
      { name: 'Vue.js', icon: SiVuedotjs, color: '#42b883' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: SiCss, color: '#1572B6' },
      { name: 'TailwindCSS', icon: SiTailwindcss, color: '#38BDF8' },
      { name: 'Vite', icon: SiVite, color: '#646CFF' },
    ],
  },
  {
    label: 'Backend',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'Express.js', icon: SiExpress, color: '#ffffff' },
      { name: 'Laravel', icon: SiLaravel, color: '#FF2D20' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'PHP', icon: SiPhp, color: '#777BB4' },
    ],
  },
  {
    label: 'Database & BaaS',
    skills: [
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    ],
  },
  {
    label: 'Tools',
    skills: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, color: '#ffffff' },
      { name: 'WordPress', icon: SiWordpress, color: '#21759B' },
    ],
  },
]