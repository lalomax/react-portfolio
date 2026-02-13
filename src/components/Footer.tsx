import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { AiOutlineTwitter, AiOutlineFacebook, AiFillGithub, AiOutlineLinkedin, AiFillGitlab, AiOutlineInstagram } from 'react-icons/ai';

const socialLinks = [
  {
    id: 1,
    link: "https://twitter.com/OrlandoFloresH",
    icon: <AiOutlineTwitter className="w-6 h-6" />,
    label: "Twitter profile",
    name: "Twitter"
  },
  {
    id: 2,
    link: "https://www.facebook.com/OrlandoFloresHuanca",
    icon: <AiOutlineFacebook className="w-6 h-6" />,
    label: "Facebook profile",
    name: "Facebook"
  },
  { 
    id: 3,
    link: "https://github.com/lalomax",
    icon: <AiFillGithub className="w-6 h-6" />,
    label: "GitHub profile",
    name: "GitHub"
  },
    {
    id: 5,
    link: "https://www.linkedin.com/in/orlando-flores365/",
    icon: <AiOutlineLinkedin className="w-6 h-6" />,
    label: "LinkedIn profile",
    name: "LinkedIn"
  },
  {
    id: 4,
    link: "https://gitlab.com/lalomax",
    icon: <AiFillGitlab className="w-6 h-6" />,
    label: "GitLab profile",
    name: "GitLab"
  },

];

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primaryDark text-white py-12 px-5">
      <div className="container mx-auto">
        <motion.div 
          className="flex flex-col items-center justify-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Social Links */}
          <div className="flex space-x-6 mb-6">
            {socialLinks.map(({ id, link, icon, label }) => (
              <motion.a
                key={id}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-gray-300 hover:text-accent transition-colors duration-300"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                {icon}
              </motion.a>
            ))}
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
            <motion.a 
              href="#about" 
              className="text-gray-300 hover:text-accent transition-colors duration-300"
              whileHover={{ y: -2 }}
            >
              {t('AboutMe')}
            </motion.a>
            <motion.a 
              href="#projects" 
              className="text-gray-300 hover:text-accent transition-colors duration-300"
              whileHover={{ y: -2 }}
            >
              {t('Projects')}
            </motion.a>
            <motion.a 
              href="#contact" 
              className="text-gray-300 hover:text-accent transition-colors duration-300"
              whileHover={{ y: -2 }}
            >
              {t('Contact')}
            </motion.a>
          </nav>

          {/* Copyright */}
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; {currentYear} Lalomax - {t('copyright')}</p>
            <p className="mt-2 text-xs">
              {t('Built with')} <span className="text-accent">❤️</span> {t('using React, TypeScript, and Tailwind CSS')}
            </p>
            <p className="mt-3 text-xs">
              {t('PhotoCredit')}{' '}
              <motion.a
                href="https://www.instagram.com/galiel_gabriel/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-light transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AiOutlineInstagram className="inline w-4 h-4 mr-1" />
                {t('Photographer')}
              </motion.a>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;