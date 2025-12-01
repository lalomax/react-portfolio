import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { HashLink as Link } from 'react-router-hash-link';
import { flushSync } from 'react-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import ReactGA from 'react-ga4';

const Header = () => {
  
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(!window.matchMedia("(prefers-color-scheme: dark)").matches);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);


  useEffect(() => {
      setTimeout(() => {
        
        handleThemeSwitch();
      }, 1000);
  }, []);

  useEffect(() => {
    ReactGA.initialize(import.meta.env.VITE_GA_TRACKING_ID);
    ReactGA.gtag('event', 'page_view', {
      page_path: '/',
      
    });
  }, []);

  const handleLanguageSwitch = () => {
    // setIsEnglish(!isEnglish);
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  };

  const handleThemeSwitch = async () => {
    await document.startViewTransition(() => {
      flushSync(() => {
        setIsDarkMode(isDarkMode => !isDarkMode);
        // setIsDarkMode(isDarkMode);
      });
    }).ready;
    // handleToggleMenu();
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // console.log(isDarkMode);
  const handleToggleMenu = () => setToggleMenu(!toggleMenu);

  function handleClick( event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
    ReactGA.event({
      category: 'Button',
      action: 'Click',
      label: event.currentTarget.innerText,
    });
  }

  return (
    <motion.header 
      className="fixed w-full bg-primaryDark/90 dark:bg-gray-900/90 backdrop-blur-md z-50 shadow-lg"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-5">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <Link 
              to="/" 
              className="text-2xl md:text-3xl font-bold text-white px-3 py-1.5 relative group"
              onClick={handleClick}
            >
              <span className="relative z-10 text-accent group-hover:text-accent-light transition-colors duration-300">
                Lalomax
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { to: '/#about', text: t('AboutMe') },
              { to: '/#projects', text: t('Projects') },
              { to: '/#contact', text: t('Contact') },
              { 
                to: 'https://drive.google.com/file/d/1o2oOyqgRIoAvrSlCks5KXhiaLFbN4HXs/view', 
                text: t('Resume'),
                isExternal: true
              }
            ].map((item) => (
              <motion.div
                key={item.to}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative group"
              >
                <Link
                  to={item.to}
                  onClick={handleClick}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300 font-medium text-sm uppercase tracking-wider"
                >
                  {item.text}
                </Link>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.div>
            ))}

            {/* Theme Toggle */}
            <motion.button
              type="button"
              onClick={handleThemeSwitch}
              className="ml-4 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? '🌙' : '☀️'}
            </motion.button>

            {/* Language Toggle */}
            <motion.button
              type="button"
              onClick={handleLanguageSwitch}
              className="ml-2 px-3 py-1 rounded-full bg-gray-700/50 hover:bg-gray-600/50 transition-colors duration-300 text-sm font-medium text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={i18n.language === 'en' ? 'Cambiar a español' : 'Switch to English'}
            >
              {i18n.language === 'en' ? 'EN' : 'ES'}
            </motion.button>
          </nav>

          {/* Mobile menu button */}
          <motion.button
            id="navbarButton"
            aria-label="Toggle navigation menu"
            onClick={handleToggleMenu}
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
            whileTap={{ scale: 0.9 }}
          >
            {!toggleMenu ? (
              <AiOutlineMenu size={24} />
            ) : (
              <AiOutlineClose size={24} />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {toggleMenu && (
          <motion.nav
            className="md:hidden bg-primaryDark/95 dark:bg-gray-900/95 backdrop-blur-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-5 py-4 space-y-4">
              {[
                { to: '/#about', text: t('AboutMe') },
                { to: '/#projects', text: t('Projects') },
                { to: '/#contact', text: t('Contact') },
                { 
                  to: 'https://drive.google.com/file/d/1o2oOyqgRIoAvrSlCks5KXhiaLFbN4HXs/view', 
                  text: t('Resume'),
                  isExternal: true
                }
              ].map((item) => (
                <motion.div
                  key={item.to}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="border-b border-gray-700/30 last:border-0"
                >
                  <Link
                    to={item.to}
                    onClick={() => {
                      handleClick({ currentTarget: { innerText: item.text } } as React.MouseEvent<HTMLAnchorElement>);
                      handleToggleMenu();
                    }}
                    target={item.isExternal ? '_blank' : undefined}
                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    className="block py-3 text-gray-300 hover:text-white transition-colors duration-300 font-medium"
                  >
                    {item.text}
                  </Link>
                </motion.div>
              ))}

              <div className="flex justify-center space-x-4 pt-4 border-t border-gray-700/30">
                <motion.button
                  type="button"
                  onClick={() => {
                    handleThemeSwitch();
                    handleToggleMenu();
                  }}
                  className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDarkMode ? '🌙' : '☀️'}
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => {
                    handleLanguageSwitch();
                    handleToggleMenu();
                  }}
                  className="ml-2 px-3 py-1 rounded-full bg-gray-700/50 hover:bg-gray-600/50 transition-colors duration-300 text-sm font-medium text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {i18n.language === 'en' ? 'EN' : 'ES'}
                </motion.button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
