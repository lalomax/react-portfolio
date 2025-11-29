import HeroImg from "../assets/hero-portrait.webp";
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  AiOutlineTwitter,
  AiOutlineFacebook,
  AiFillGithub,
  AiOutlineLinkedin,
} from "react-icons/ai";

const icons = [
  {
    id: 1,
    link: "https://twitter.com/OrlandoFloresH",
    icon: <AiOutlineTwitter className="w-10 h-10" />,
    label: "Twitter profile",
    name: "Twitter"
  },
  {
    id: 2,
    link: "https://www.facebook.com/OrlandoFloresHuanca",
    icon: <AiOutlineFacebook className="w-10 h-10" />,
    label: "Facebook profile",
    name: "Facebook"
  },
  { 
    id: 3,
    link: "https://github.com/lalomax",
    icon: <AiFillGithub className="w-10 h-10" />,
    label: "GitHub profile",
    name: "GitHub"
  },
  {
    id: 4,
    link: "https://www.linkedin.com/in/orlando-flores365/",
    icon: <AiOutlineLinkedin className="w-10 h-10" />,
    label: "LinkedIn profile",
    name: "LinkedIn"
  },
];

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
  e.preventDefault();
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Hero = () => {
  const { t } = useTranslation();

  // Smooth scroll for anchor links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (this: HTMLElement, e: Event) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }, []);

  return (
    <section 
      id="home"
      className="min-h-screen flex items-center dark:bg-gradient-to-br from-primaryDark to-gray-900 bg-gradient-to-br from-primaryLight to-gray-100 px-5 py-20 md:py-32"
    >
      <div className="container mx-auto grid md:grid-cols-2 items-center gap-12">
        <motion.div 
          className="hero-info max-w-2xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-pacifico text-4xl md:text-5xl lg:text-6xl lg:leading-tight mb-6">
            <span className="block">{t('Hi')}</span>
            <span className="block">
              {t('Iam')} <span className="text-accent dark:text-accent">O</span>rlando
            </span>
            <span className="block text-2xl md:text-3xl font-normal mt-2">
              {t('role')}
            </span>
          </h1>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            {t('Hero-description')}
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            {icons.map(({ id, link, icon, label, name }) => (
              <motion.a
                key={id}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={name}
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 text-accent hover:bg-accent hover:text-white dark:hover:bg-accent dark:hover:text-primaryDark transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {icon}
              </motion.a>
            ))}
          </div>

          <motion.a
            href="#projects"
            onClick={(e) => scrollToSection(e, 'projects')}
            className="inline-block bg-accent hover:bg-accent/90 text-primaryDark font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('See-Projects')}
          </motion.a>
        </motion.div>

        <motion.div 
          className="hidden md:flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-accent/20 rounded-full blur-xl opacity-70"></div>
            <div className="relative">
              <img
                src={HeroImg}
                alt="Orlando Flores - Web Developer"
                width={500}
                height={500}
                className="rounded-full border-4 border-accent/20 shadow-2xl w-full max-w-md"
                loading="eager"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
