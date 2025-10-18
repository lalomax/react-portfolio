import jobtrackr from "../assets/jobtrackr.png";
// import contrata from "../assets/contrata.jpg";
import movement from "../assets/movement.jpg";
// import zepellin from "../assets/zepellin.png";
import roundpeople from "../assets/roundpeople.png";
// import pawsitive from "../assets/pawsitive.webp"
import agromentor from "../assets/agromentor.png"
import breakandfocus from "../assets/breakfocus.png"
import { useTranslation } from 'react-i18next';
import i18n from "../i18n";

const Projects = () => {
  const { t } = useTranslation();
  const projects = [
    {
      img: breakandfocus,
      title: "Break&Focus",
      desc: "Avoid procastination and focus on your goals.",
      descES: "Evita la procrastinación y enfoca tus objetivos.",
      live: "https://breakandfocus.onrender.com/",
      code: "https://github.com/No-Country-simulation/s18-09-m-node-react",
    },
    {
      img: agromentor,
      title: "Agromentor",
      desc: "Agriculture mentoring using AI and forecasts.",
      descES: "Asesoramiento agrícola mediante IA y pronósticos.",
      live: "https://s17-05-m-node-react.onrender.com/",
      code: "https://github.com/No-Country-simulation/s17-05-m-node-react",
    },
    {
      img: jobtrackr,
      title: "jobtrackr",
      desc: "An application for job tracking.",
      descES: "Una aplicación para el seguimiento de oprtunidades de trabajo.",
      live: "https://14-jobtrackr.vercel.app",
      code: "https://github.com/No-Country/s14-01-m-node-react",
    },
    {
      img: roundpeople,
      title: "Roundpeople",
      desc: "The web of musical entrepreneurship.",
      descES: "La web de la iniciativa de creación musical.",
      live: "https://s13-01-m-node-react-1.onrender.com/",
      code: "https://github.com/No-Country/s13-01-m-node-react",
    },
    // {
    //   img: zepellin,
    //   title: "Zepellin",
    //   desc: "Sportswear trade and social support.",
    //   live: "https://zepellin.netlify.app/",
    //   code: "https://github.com/No-Country/s8-04-m-node-react-xepelin",
    // },
    // {
    //   img: pawsitive,
    //   title: "pawsitive",
    //   desc: "Take care virtual pets.",
    //   live: "https://expo.dev/artifacts/eas/kyevpALYMkfMGKYW2zoDUx.apk",
    //   code: "https://github.com/No-Country/s7-27-m-desafioreactnative",
    // },
    // {
    //   img: contrata,
    //   title: "Contratá",
    //   desc: "A platform to connect people with qualified services.",
    //   descES: "Plataforma para conectar personas con servicios calificados.",
    //   live: "https://contrata.vercel.app/",
    //   code: "https://github.com/No-Country/S6-15-M-MERN",
    // },
    {
      img: movement,
      title: "Movement",
      desc: "Sportswear trade and social support.",
      descES: "Comercio de ropa deportiva y apoyo social.",
      live: "https://c854pernfront-5m8om.ondigitalocean.app/home",
      code: "https://github.com/No-Country/c8-t-54-pern",
    },
  ];

  return (
    <section className="bg-primaryLight dark:bg-primaryDark px-5 py-32" id="projects">
      <div className="container mx-auto grid md:grid-cols-2 items-center md:justify-between">
        <div className="about-info mb-5 ">
          <h2 className="text-4xl inline-block font-bold mb-5 border-b-[5px] border-indigo-600 pb-2">
            {t('Projects')}
          </h2>

          <p className="pb-5">
            {t('ProjectsDesc')}
          </p>
        </div>

        <div className="about-img"></div>
      </div>

      <div className="projects container mx-auto grid md:grid-cols-3 gap-10">
        {projects.map((project, i) => {
          return (
            <div className="relative" key={i}>
              <img className="w-full h-full fit-cover" src={project.img} alt={project.title} />
              <div className="flex absolute left-0 right-0 top-[13px] bottom-0 mx-auto w-[90%] h-[90%]  bg-primaryDark  opacity-0 duration-500 justify-center flex-col hover:opacity-100 ">
                <p className="py-5 text-center font-bold px-2 text-white">
                  {i18n.language === 'es' ? project.descES : project.desc}
                </p>

                <div className="mx-auto">
                  <a
                    href={project.live}
                    className="px-5 py-2 bg-blue-500 hover:bg-blue-600 mr-5 font-bold"
                    target="_blank"
                  >
                    {t('Live')}
                  </a>
                  <a
                    href={project.code}
                    className="px-5 py-2 bg-blue-500 hover:bg-blue-800 font-bold"
                    target="_blank"
                  >
                    {t('Code')}
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
