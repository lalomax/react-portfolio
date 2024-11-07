import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";

import Contact from "../components/Contact";

const Home = () => {

  return (
    <div className="dark:text-white text-primaryDark">
      <Hero />
      <About />
      <Projects />

      <Contact />
    </div>
  );
};

export default Home;
