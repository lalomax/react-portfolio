import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

// Project images
import jobtrackr from "../assets/jobtrackr.png";
import movement from "../assets/movement.jpg";
import roundpeople from "../assets/roundpeople.png";
import agromentor from "../assets/agromentor.png";
import breakandfocus from "../assets/breakfocus.png";

interface Project {
  img: string;
  title: string;
  desc: string;
  descES: string;
  live: string;
  code: string;
  tags: string[];
}

const Projects = () => {
  const { t, i18n } = useTranslation();
  
  const projects: Project[] = [
    {
      img: breakandfocus,
      title: "Break&Focus",
      desc: "Avoid procastination and focus on your goals.",
      descES: "Evita la procrastinación y enfoca tus objetivos.",
      live: "https://breakandfocus.onrender.com/",
      code: "https://github.com/No-Country-simulation/s18-09-m-node-react",
      tags: ["React", "Node.js", "MongoDB", "Express"]
    },
    {
      img: agromentor,
      title: "Agromentor",
      desc: "Agriculture mentoring using AI and forecasts.",
      descES: "Asesoramiento agrícola mediante IA y pronósticos.",
      live: "https://s17-05-m-node-react.onrender.com/",
      code: "https://github.com/No-Country-simulation/s17-05-m-node-react",
      tags: ["React", "Node.js", "Python", "TensorFlow"]
    },
    {
      img: jobtrackr,
      title: "JobTrackr",
      desc: "An application for job tracking.",
      descES: "Una aplicación para el seguimiento de oportunidades de trabajo.",
      live: "https://14-jobtrackr.vercel.app",
      code: "https://github.com/No-Country/s14-01-m-node-react",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"]
    },
    {
      img: roundpeople,
      title: "Roundpeople",
      desc: "The web of musical entrepreneurship.",
      descES: "La web de la iniciativa de creación musical.",
      live: "https://s13-01-m-node-react-1.onrender.com/",
      code: "https://github.com/No-Country/s13-01-m-node-react",
      tags: ["React", "Node.js", "PostgreSQL", "Express"]
    },
    {
      img: movement,
      title: "Movement",
      desc: "Sportswear trade and social support.",
      descES: "Comercio de ropa deportiva y apoyo social.",
      live: "https://c854pernfront-5m8om.ondigitalocean.app/home",
      code: "https://github.com/No-Country/c8-t-54-pern",
      tags: ["React", "Node.js", "PostgreSQL", "Express"]
    }
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section 
      id="projects" 
      className="py-20 px-4 sm:px-6 bg-gradient-to-b from-primaryLight/20 to-primaryLight/5 dark:from-primaryDark/10 dark:to-primaryDark/5 text-gray-900 dark:text-gray-100"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primaryDark dark:text-white">
            {t('Projects')}
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-500 max-w-3xl mx-auto">
            {t('ProjectsDesc')}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              variants={item}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={project.img} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 text-xs font-medium bg-accent/20 text-accent dark:text-accent-light/90 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-primaryDark dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {i18n.language === 'es' && project.descES ? project.descES : project.desc}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                    aria-label={`View live demo of ${project.title}`}
                  >
                    <FiExternalLink className="mr-1.5" /> {t('View Live')}
                  </a>
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    aria-label={`View source code of ${project.title}`}
                  >
                    <FiGithub className="mr-1.5" /> {t('Source Code')}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
