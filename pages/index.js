import Head from "next/head";
import Script from "next/script";
import { AiFillTwitterCircle, AiFillLinkedin, AiFillMail } from "react-icons/ai";
import { FaGithub, FaGraduationCap, FaBriefcase, FaLaptopCode, FaQuoteLeft, FaCloud, FaCode, FaTools, FaDatabase, FaDownload } from "react-icons/fa";
import Typewriter from "typewriter-effect";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Import JSON Data
import educationData from "../Data/educationData.json";
import experienceData from "../Data/experienceData.json";
import projectsData from "../Data/projectsData.json";
import recommendations from "../Data/recommendationData.json";
import skillsData from "../Data/skillsData.json";

// Import Components
import CustomCursor from "../Components/CustomCursor";
import BackToTopButton from "../Components/BackToTopButton";

// Counter component: animates from 0 to target over given duration (ms)
function Counter({ target, duration }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 50); // update every 50ms
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 50);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <span>{count}</span>;
}

export default function Home() {
  const [index, setIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  const nextRecommendation = () => {
    setIndex((prevIndex) => (prevIndex + 1) % recommendations.length);
  };

  const prevRecommendation = () => {
    setIndex((prevIndex) => (prevIndex - 1 + recommendations.length) % recommendations.length);
  };

  // Framer Motion animation variants for section reveal
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  // Update scroll progress indicator on scroll
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Open and close project modal functions
  const openProjectModal = (proj) => setSelectedProject(proj);
  const closeProjectModal = () => setSelectedProject(null);

  // Helper function: Map skill category to an icon
  const getSkillIcon = (category) => {
    if (category.toLowerCase().includes("cloud") || category.toLowerCase().includes("devops")) {
      return <FaCloud className="inline mr-2 text-orange-500" />;
    }
    if (category.toLowerCase().includes("programming") || category.toLowerCase().includes("web")) {
      return <FaCode className="inline mr-2 text-orange-500" />;
    }
    if (category.toLowerCase().includes("tools") || category.toLowerCase().includes("development")) {
      return <FaTools className="inline mr-2 text-orange-500" />;
    }
    if (category.toLowerCase().includes("database")) {
      return <FaDatabase className="inline mr-2 text-orange-500" />;
    }
    return null;
  };

  // Inline SVG pattern for texture (diagonal lines)
  const svgTexture = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <line x1="0" y1="20" x2="20" y2="0" stroke="gray" stroke-width="0.5" opacity="0.3"/>
    </svg>
  `);

  return (
    <div className="relative bg-gradient-to-r from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <CustomCursor />
      <Head>
        <title>Jaydipsinh Padhiyar Portfolio</title>
        <meta charSet="UTF-8" name="description" content="Portfolio of Jaydipsinh Padhiyar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src="//cdn.jsdelivr.net/github-cards/latest/widget.js" strategy="lazyOnload" />
      <Script src="https://www.twilik.com/assets/retainable/rss-embed/retainable-rss-embed.js" strategy="lazyOnload" />
      <Script src="https://unpkg.com/@rocktimsaikia/github-card@latest?module" strategy="lazyOnload" />

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50">
        <div className="h-full bg-orange-500" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      <main className="pt-16">
        {/* HERO SECTION with Multiline Terminal Output and Texture */}
        <section
          id="hero"
          className="relative h-screen flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-bg.jpg')", backgroundAttachment: "fixed" }}
        >
          {/* Subtle gradient overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-5"></div>
          {/* Inline SVG Texture Overlay */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,${svgTexture}")`,
              backgroundRepeat: "repeat",
              backgroundSize: "20px 20px"
            }}
          ></div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="relative z-10 w-full max-w-xl mx-auto px-6 py-8 md:px-8 md:py-10 bg-gray-900 bg-opacity-90 rounded-xl shadow-xl"
          >
            <div className="font-mono text-green-400 text-sm md:text-base leading-relaxed whitespace-pre-line">
              <Typewriter
                options={{ autoStart: true, loop: true, delay: 50, cursor: "_" }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString('$ echo "Hello, I\'m Jaydipsinh Padhiyar, a Full-Stack Developer."')
                    .pauseFor(800)
                    .typeString("\n$ cat skills.txt")
                    .pauseFor(800)
                    .typeString('\n   C++, JavaScript, AWS, Azure, Docker, Kubernetes, CI/CD, and more.')
                    .pauseFor(800)
                    .typeString("\n$ cat experience.txt")
                    .pauseFor(800)
                    .typeString('\n   Software Developer at Persuasive Computing Lab')
                    .pauseFor(400)
                    .typeString('\n   Intern at BISAG-N, Future Ready Talent, CHARUSAT University')
                    .pauseFor(800)
                    .typeString("\n$ cat projects.txt")
                    .pauseFor(800)
                    .typeString('\n   DalVacationHome, FurrEverHome, BidSphere, K8s Microservice')
                    .pauseFor(1000)
                    .typeString("\n$ echo \"Let\'s build innovative solutions together.\"")
                    .pauseFor(1500)
                    .deleteAll()
                    .start();
                }}
              />
            </div>
            <div className="flex space-x-4 mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex-1 px-8 py-3 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition"
                onClick={() => document.getElementById("about").scrollIntoView({ behavior: "smooth" })}
              >
                Explore My Work
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="https://drive.google.com/file/d/1Qnkz8tM8R5gZ7tKlJO0h-Y0x2q1nns1x/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center px-8 py-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition"
              >
                <FaDownload className="mr-2" /> Download Resume
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* STATISTICS SECTION */}
        <section id="stats" className="py-16">
          <motion.div initial="hidden" whileInView="visible" variants={sectionVariants} className="max-w-4xl mx-auto px-6 text-center">
            <h3 className="text-4xl font-semibold text-orange-500 mb-8">Statistics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-700/40 backdrop-blur-sm p-6 rounded-xl shadow-md">
                <p className="text-3xl font-bold text-orange-500">
                  <Counter target={6} duration={2000} /><span>+</span>
                </p>
                <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">Years of Experience</p>
              </div>
              <div className="bg-white dark:bg-gray-700/40 backdrop-blur-sm p-6 rounded-xl shadow-md">
                <p className="text-3xl font-bold text-orange-500">
                  <Counter target={10} duration={2000} /><span>+</span>
                </p>
                <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">Projects Completed</p>
              </div>
              <div className="bg-white dark:bg-gray-700/40 backdrop-blur-sm p-6 rounded-xl shadow-md">
                <p className="text-3xl font-bold text-orange-500">
                  <Counter target={5} duration={2000} /><span>+</span>
                </p>
                <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">Certifications</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ABOUT ME SECTION */}
        <section id="about" className="py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={sectionVariants}
            className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center space-y-6"
          >
            <h3 className="text-4xl font-semibold text-orange-500 flex items-center justify-center">
              <FaLaptopCode className="mr-2" /> About Me
            </h3>
            <div>
              <img src="/Logo.png" alt="Jaydipsinh" className="w-40 h-40 md:w-50 md:h-52 rounded-full shadow-xl border-4 border-orange-500" />
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              I'm a passionate full-stack developer with a strong foundation in computer science. I specialize in crafting elegant web applications and deploying them on scalable cloud infrastructures. My goal is to blend creativity with technical expertise to build engaging digital experiences.
            </p>
          </motion.div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-16 bg-gray-50 dark:bg-gray-800">
          <motion.div initial="hidden" whileInView="visible" variants={sectionVariants} className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-semibold text-orange-500">Skills</h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">What I bring to the table.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {skillsData.skills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm p-6 rounded-xl shadow-md transition"
                >
                  <h4 className="text-xl font-bold text-orange-500 mb-2">
                    {getSkillIcon(skill.category)}
                    {skill.category}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">{skill.details}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" className="py-16">
          <motion.div initial="hidden" whileInView="visible" variants={sectionVariants} className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-semibold text-orange-500 flex items-center justify-center">
                <FaGraduationCap className="mr-2" /> Education
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">My academic journey</p>
            </div>
            <div className="space-y-8">
              {educationData.map((edu, idx) => (
                <div key={idx} className="bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-xl transition">
                  <h4 className="text-2xl font-bold text-orange-500">
                    {edu.institution} <span className="text-lg font-medium">({edu.year})</span>
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">{edu.degree} | GPA: {edu.gpa}</p>
                  {edu.courses && (
                    <ul className="list-disc list-inside mt-2 text-gray-600 dark:text-gray-300">
                      {edu.courses.map((course, courseIdx) => (
                        <li key={courseIdx}>{course}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="py-16 bg-gray-50 dark:bg-gray-800">
          <motion.div initial="hidden" whileInView="visible" variants={sectionVariants} className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-semibold text-orange-500 flex items-center justify-center">
                <FaBriefcase className="mr-2" /> Experience
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">Where I've honed my skills</p>
            </div>
            <div className="space-y-8">
              {experienceData.map((exp, idx) => (
                <div key={idx} className="bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-xl transition">
                  <h4 className="text-2xl font-bold text-orange-500">
                    {exp.company} <span className="text-lg font-medium">({exp.period})</span>
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">{exp.role}:</p>
                  <ul className="list-disc list-inside mt-2 text-gray-600 dark:text-gray-300">
                    {exp.details.map((detail, detailIdx) => (
                      <li key={detailIdx}>{detail}</li>
                    ))}
                  </ul>
                  {exp.certificateLink && (
                    <a
                      href={exp.certificateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:underline mt-2 inline-block"
                    >
                      View Certificate
                    </a>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-16">
          <motion.div initial="hidden" whileInView="visible" variants={sectionVariants} className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-semibold text-orange-500 flex items-center justify-center">
                <FaLaptopCode className="mr-2" /> Projects
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">My recent work</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projectsData.map((proj, idx) => (
                <div
                  key={idx}
                  className="bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer"
                  onClick={() => openProjectModal(proj)}
                >
                  <h4 className="text-2xl font-bold text-orange-500">
                    {proj.title} <span className="text-lg font-medium">({proj.stack})</span>
                  </h4>
                  <ul className="list-disc list-inside mt-2 text-gray-600 dark:text-gray-300">
                    {proj.details.slice(0, 3).map((detail, detailIdx) => (
                      <li key={detailIdx}>{detail}</li>
                    ))}
                    {proj.details.length > 3 && <li>...more</li>}
                  </ul>
                  {proj.githubLink && (
                    <a
                      href={proj.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:underline mt-2 inline-block"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View on GitHub
                    </a>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* PROJECT MODAL */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeProjectModal}
            >
              <motion.div
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl max-w-xl mx-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h4 className="text-2xl font-bold text-orange-500 mb-4">{selectedProject.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  <strong>Tech Stack:</strong> {selectedProject.stack}
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                  {selectedProject.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
                {selectedProject.githubLink && (
                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:underline"
                  >
                    View on GitHub
                  </a>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={closeProjectModal}
                  className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
                >
                  Close
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TESTIMONIALS SECTION */}
        <section id="testimonials" className="py-16 bg-gray-50 dark:bg-gray-800">
          <motion.div initial="hidden" whileInView="visible" variants={sectionVariants} className="max-w-3xl mx-auto px-6 text-center">
            <h3 className="text-4xl font-semibold text-orange-500 flex items-center justify-center mb-6">
              <FaQuoteLeft className="mr-2" /> Testimonials
            </h3>
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              className="bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-xl transition"
            >
              <blockquote className="text-xl italic text-gray-700 dark:text-gray-300">
                "{recommendations[index].text}"
              </blockquote>
              <p className="text-lg font-semibold text-gray-600 dark:text-gray-400 mt-4">
                - {recommendations[index].name}, {recommendations[index].title}
              </p>
            </motion.div>
            <div className="flex justify-center mt-8 space-x-6">
              <button onClick={prevRecommendation} className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
                &larr; Prev
              </button>
              <button onClick={nextRecommendation} className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
                Next &rarr;
              </button>
            </div>
          </motion.div>
        </section>

        <BackToTopButton />
      </main>
    </div>
  );
}
