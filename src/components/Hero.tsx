import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ExternalLinkModal from './ExternalLinkModal';
import heroPortrait from '../assets/hero-portrait.webp';
import {
  AiOutlineTwitter,
  AiOutlineFacebook,
  AiFillGithub,
  AiOutlineLinkedin,
  AiFillGitlab,
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
    id: 4,
    link: "https://www.linkedin.com/in/orlando-flores365/",
    icon: <AiOutlineLinkedin className="w-10 h-10" />,
    label: "LinkedIn profile",
    name: "LinkedIn"
  },
  { 
    id: 3,
    link: "https://github.com/lalomax",
    icon: <AiFillGithub className="w-10 h-10" />,
    label: "GitHub profile",
    name: "GitHub"
  },
  {
    id: 5,
    link: "https://gitlab.com/lalomax",
    icon: <AiFillGitlab className="w-10 h-10" />,
    label: "GitLab profile",
    name: "GitLab"
  },
  
  
];

const Hero = () => {
  const { t } = useTranslation();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    url: string;
  }>({
    isOpen: false,
    url: '',
  });

  const handleConfirmNavigation = () => {
    window.open(modalState.url, '_blank', 'noopener,noreferrer');
    setModalState({ isOpen: false, url: '' });
  };

  const handleCancelNavigation = () => {
    setModalState({ isOpen: false, url: '' });
  };

  // Handle all link clicks
  useEffect(() => {
    const handleLinkClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      if (!href) return;
      
      // Handle internal anchor links
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
        return;
      }
      
      // Handle external links
      if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        e.preventDefault();
        setModalState({ isOpen: true, url: href });
        return;
      }
    };
    
    // Add click listeners to all links
    document.addEventListener('click', handleLinkClick);
    
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  
  }, []);

  return (
    <>
      <ExternalLinkModal
        isOpen={modalState.isOpen}
        onConfirm={handleConfirmNavigation}
        onCancel={handleCancelNavigation}
        url={modalState.url}
      />
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
            className="inline-block bg-accent hover:bg-accent/90 text-primaryDark font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 cursor-pointer"
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
              <div className="w-full max-w-md aspect-square bg-gray-200 dark:bg-gray-700 rounded-full border-4 border-accent/20 shadow-2xl overflow-hidden">
                <img 
                  src={heroPortrait} 
                  alt="Orlando Flores" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default Hero;
