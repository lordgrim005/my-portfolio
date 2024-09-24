import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useViewportScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Code,
  Briefcase,
  User,
  ChevronDown,
} from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Bot Telegram",
    description:
      "An Bot who can input and output data from telegram to google sheets",
  },
  {
    id: 2,
    title: "Mobile App",
    description: "simple mobile application",
  },
  {
    id: 3,
    title: "Simple Project",
    description: "Simple project for school students",
  },
];

const skills = [
  { name: "Java", level: 999 },
  { name: "Mobile", level: 999 },
  { name: "HTML/CSS", level: 999 },
  { name: "Python", level: 999 },
  { name: "React", level: 999 },
];

const StunningPortfolio = () => {
  const [cursorVariant, setCursorVariant] = useState("default");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("home");

  const { scrollYProgress } = useViewportScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const pathLength = useSpring(yRange, { stiffness: 400, damping: 90 });

  useEffect(() => {
    const mouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  const variants = {
    default: { x: mousePosition.x - 16, y: mousePosition.y - 16 },
    text: {
      height: 150,
      width: 150,
      fontSize: "16px",
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
    },
  };

  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");

  const scrollTo = (section) => {
    setActiveSection(section);
    document.getElementById(section).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <motion.div
        className="cursor"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        {cursorVariant === "text" && <span className="cursorText">View</span>}
      </motion.div>

      <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-md z-40">
        <ul className="flex justify-center space-x-8 py-4">
          {["home", "about", "projects", "contact"].map((section) => (
            <li key={section}>
              <button
                onClick={() => scrollTo(section)}
                className={`capitalize text-lg hover:text-purple-400 transition-colors ${
                  activeSection === section ? "text-purple-500" : ""
                }`}
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                {section}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />

      <section
        id="home"
        className="h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="stars"></div>
          <div className="twinkling"></div>
        </div>
        <div className="text-center z-10">
          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
          >
            Welcome to My Universe
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl mb-8 text-blue-300"
          >
            Where Innovation Meets Imagination
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollTo("about")}
            className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors"
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
          >
            Explore My Cosmos
          </motion.button>
        </div>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-10"
        >
          <ChevronDown size={32} className="text-purple-400" />
        </motion.div>
      </section>

      <section
        id="about"
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-purple-900 p-8"
      >
        <div className="max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold mb-6 text-purple-300"
          >
            About the Creator
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl mb-8 text-blue-200"
          >
            I'm a visionary tech alchemist, blending cutting-edge technologies
            to craft digital experiences that push the boundaries of what's
            possible. My mission is to transform abstract concepts into tangible
            innovations that shape the future.
          </motion.p>
          <h3 className="text-3xl font-semibold mb-4 text-pink-400">
            Technological Arsenal
          </h3>
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.name} className="flex flex-col">
                <div className="flex justify-between mb-1">
                  <span className="text-blue-200">{skill.name}</span>
                  <span className="text-purple-300">{skill.level}%</span>
                </div>
                <motion.div
                  className="h-2 bg-purple-800 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <div className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="min-h-screen bg-gradient-to-b from-purple-900 to-black p-8"
      >
        <h2 className="text-5xl font-bold mb-12 text-center text-purple-300">
          Cosmic Creations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ scale: 1.05, rotateY: 10 }}
              className="bg-purple-800 bg-opacity-50 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-purple-500/50"
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
            >
              <h3 className="text-2xl font-semibold mb-2 text-pink-400">
                {project.title}
              </h3>
              <p className="text-blue-200">{project.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-purple-900 p-8"
      >
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold mb-6 text-purple-300"
          >
            Initiate Contact
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl mb-8 text-blue-200"
          >
            Ready to embark on a journey of innovation? Let's connect across the
            digital cosmos!
          </motion.p>
          <div className="flex justify-center space-x-6">
            {[Github, Linkedin, Mail].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="text-purple-400 hover:text-purple-300 transition-colors"
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                <Icon size={40} />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-black text-center py-6 border-t border-purple-800">
        <p className="text-purple-400">
          &copy; All rights reserved across the
          multiverse.
        </p>
      </footer>

      <style jsx>{`
        .cursor {
          background-color: #8b5cf6;
          height: 32px;
          width: 32px;
          border-radius: 50%;
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 9999;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-weight: bold;
          mix-blend-mode: difference;
        }
        .progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(to right, #8b5cf6, #ec4899);
          transform-origin: 0%;
          z-index: 9999;
        }
        .stars,
        .twinkling {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          display: block;
        }
        .stars {
          background: #000
            url(http://www.script-tutorials.com/demos/360/images/stars.png)
            repeat top center;
          z-index: 0;
        }
        .twinkling {
          background: transparent
            url(http://www.script-tutorials.com/demos/360/images/twinkling.png)
            repeat top center;
          z-index: 1;
          animation: move-twink-back 200s linear infinite;
        }
        @keyframes move-twink-back {
          from {
            background-position: 0 0;
          }
          to {
            background-position: -10000px 5000px;
          }
        }
      `}</style>
    </div>
  );
};

export default StunningPortfolio;
