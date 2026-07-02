/* eslint-disable @next/next/no-img-element */
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaReact,
  FaNodeJs,
  FaAws,
  FaDocker,
  FaJava,
  FaGamepad,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiMongodb,
  SiExpress,
  SiKubernetes,
  SiTerraform,
  SiGooglecloud,
  SiPython,
  SiStripe,
  SiSpringboot,
  SiGodotengine,
} from "react-icons/si";

const techIcons = {
  React: <FaReact />,
  AWS: <FaAws />,
  Lambda: <FaAws />,
  DynamoDB: <span className="font-bold text-xs">DB</span>,
  "API Gateway": <span className="font-bold text-xs">API</span>,
  "Node.js": <FaNodeJs />,
  Express: <SiExpress />,
  MongoDB: <SiMongodb />,
  SpringBoot: <SiSpringboot />,
  Stripe: <SiStripe />,
  Docker: <FaDocker />,
  Kubernetes: <SiKubernetes />,
  GCP: <SiGooglecloud />,
  Terraform: <SiTerraform />,
  Python: <SiPython />,
  Godot: <SiGodotengine />,
  GDScript: <FaGamepad />,
  "Game Development": <FaGamepad />,
  TypeScript: <SiTypescript />,
  JavaScript: <SiJavascript />,
};

const getYoutubeEmbed = (videoId) =>
  `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;

const getYoutubeThumbnail = (videoId) =>
  `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

export default function ProjectExplanations({ projects = [] }) {
  const validProjects = useMemo(
    () => projects.filter((project) => project.videoId),
    [projects]
  );

  const [activeProject, setActiveProject] = useState(validProjects[0]);

  if (!activeProject) return null;

  const activeStack = activeProject.stack
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <section id="explanations" className="py-20 bg-white dark:bg-[#0b1220]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.35em] text-orange-500 font-bold text-sm">
            Video Walkthroughs
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-3">
            Project <span className="text-orange-500">Explanations</span>
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mt-4 text-lg max-w-2xl mx-auto">
            Deep-dive videos where I explain the project flow, architecture,
            implementation, and technical decisions.
          </p>
        </div>

        <div className="rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-950 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-4 md:p-6 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800">
              <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900">
                <iframe
                  className="w-full h-full"
                  src={getYoutubeEmbed(activeProject.videoId)}
                  title={`${activeProject.title} explanation`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    {activeProject.title}
                  </h3>

                  <p className="text-orange-500 font-semibold mt-2">
                    {activeProject.subtitle}
                  </p>
                </div>

                <a
                  href={activeProject.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:border-orange-500 hover:text-orange-500 transition"
                >
                  GitHub Repo <FaGithub />
                </a>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mt-5 leading-relaxed">
                {activeProject.details[0]}
              </p>

              <div className="h-px bg-gray-200 dark:bg-gray-800 my-6" />

              <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                What I Explain
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeProject.details.slice(1, 5).map((detail, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                  >
                    <span className="mt-1 h-5 w-5 rounded-full bg-orange-500 text-white text-xs grid place-items-center shrink-0">
                      ✓
                    </span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                {activeStack.map((tech) => (
                  <div
                    key={tech}
                    title={tech}
                    className="h-12 w-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-2xl text-orange-500 hover:-translate-y-1 transition"
                  >
                    {techIcons[tech] || tech.charAt(0)}
                  </div>
                ))}
              </div>

              <a
                href={activeProject.explanationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition mt-7"
              >
                Watch on YouTube <FaExternalLinkAlt />
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-7">
          {validProjects.map((project) => (
            <motion.button
              key={project.title}
              whileHover={{ y: -4 }}
              onClick={() => setActiveProject(project)}
              className={`text-left rounded-2xl border p-4 bg-white dark:bg-slate-950 shadow transition ${
                activeProject.title === project.title
                  ? "border-orange-500"
                  : "border-gray-200 dark:border-gray-800"
              }`}
            >
              <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900 relative">
                <img
                  src={getYoutubeThumbnail(project.videoId)}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/20 grid place-items-center">
                  <span className="h-14 w-14 rounded-full bg-white/90 text-orange-500 grid place-items-center text-2xl shadow">
                    ▶
                  </span>
                </div>
              </div>

              <h4 className="text-xl font-bold text-gray-900 dark:text-white mt-4">
                {project.title}
              </h4>

              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {project.subtitle}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.stack
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean)
                  .slice(0, 5)
                  .map((tech) => (
                    <span
                      key={tech}
                      title={tech}
                      className="h-9 w-9 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-orange-500 bg-white dark:bg-slate-900"
                    >
                      {techIcons[tech] || tech.charAt(0)}
                    </span>
                  ))}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}