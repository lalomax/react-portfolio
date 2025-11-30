import { Link } from "react-router-dom";
import AboutImg from "../assets/about-orland.jpg";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const About = () => {
  const { t } = useTranslation();

  return (
    <section className="dark:bg-primaryDark bg-primaryLight px-5 py-32 " id="about">
      <div className="container mx-auto grid md:grid-cols-2 items-center justify-center md:justify-between ">
        <div className="about-info ">
          <h2 className="text-4xl inline-block font-bold mb-5 border-b-[5px] border-indigo-600 pb-2">
            {t('AboutMe')}
          </h2>

          <p className="pb-5">
            {t('About-description')}
          </p>
          <p className="pb-5">
            {t('About-description1')}
            <a href="https://ankiweb.net/shared/by-author/478793435" target="_blank" className="underline">{t('About-description2')}</a>
            {t('About-description3')}
          </p>

          {/* <p>In backend I know Node.js, Express.js, MongoDB, and Mongoose</p> */}

    
          <Link
            to="https://drive.google.com/file/d/1o2oOyqgRIoAvrSlCks5KXhiaLFbN4HXs/view" 
            target="_blank"
            className="inline-block bg-accent hover:bg-accent/90 text-primaryDark font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 cursor-pointer my-4"
          >
            {t('Resume')}
          </Link>
        </div>

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
                  src={AboutImg}
                  alt="Orlando Flores" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;