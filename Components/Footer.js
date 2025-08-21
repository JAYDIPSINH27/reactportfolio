/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import {
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowUp,
} from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  const scrollToTop = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-gray-100 via-white to-white
  dark:from-[#0b1220] dark:via-[#0f172a] dark:to-[#111827]
  text-gray-700 dark:text-gray-300">

      {/* Decorative gradient blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-orange-400/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute top-8 -right-24 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />

      {/* Top divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-70" />

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand / About */}
          <div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
              Jaydipsinh Padhiyar
            </h4>
            <p className="mt-3 text-sm leading-6">
              Full-stack developer focused on crafting elegant web apps and
              scalable cloud solutions. Let’s build something great.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/70 dark:bg-slate-800/60 backdrop-blur px-3 py-1 text-xs border border-gray-200 dark:border-gray-700">
              <FaMapMarkerAlt className="opacity-75" />
              <span>Canada</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-sm font-semibold tracking-wider uppercase text-gray-900 dark:text-white">
              Quick Links
            </h5>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                ["About", "/#about"],
                ["Skills", "/#skills"],
                ["Education", "/#education"],
                ["Experience", "/#experience"],
                ["Projects", "/#projects"],
                ["Testimonials", "/#testimonials"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="hover:text-orange-600 dark:hover:text-orange-400 transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-sm font-semibold tracking-wider uppercase text-gray-900 dark:text-white">
              Contact
            </h5>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <FaEnvelope className="opacity-80" />
                <a
                  href="mailto:jaydipadhiyar27@gmail.com"
                  className="hover:text-orange-600 dark:hover:text-orange-400 transition"
                >
                  jaydipadhiyar27@gmail.com
                </a>
              </li>
              <li className="text-xs text-gray-500 dark:text-gray-400">
                Open to full-time roles & collaborations.
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h5 className="text-sm font-semibold tracking-wider uppercase text-gray-900 dark:text-white">
              Social
            </h5>
            <p className="mt-4 text-sm">Get connected with me:</p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://twitter.com/jpsinh27"
                aria-label="Twitter"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/70 text-gray-700 hover:text-white hover:bg-[#1DA1F2] dark:border-gray-700 dark:bg-slate-800/60 dark:text-gray-200 transition"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.linkedin.com/in/jaydipsinh-padhiyar/"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/70 text-gray-700 hover:text-white hover:bg-[#0A66C2] dark:border-gray-700 dark:bg-slate-800/60 dark:text-gray-200 transition"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://github.com/JAYDIPSINH27"
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/70 text-gray-700 hover:text-white hover:bg-gray-900 dark:border-gray-700 dark:bg-slate-800/60 dark:text-gray-200 transition"
              >
                <FaGithub />
              </a>
            </div>

            {/* Resume CTA */}
            <div className="mt-6">
              <a
                href="https://drive.google.com/file/d/1Qnkz8tM8R5gZ7tKlJO0h-Y0x2q1nns1x/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-gradient-to-r from-orange-500 to-amber-600 px-4 py-2 text-sm font-medium text-white shadow hover:shadow-md hover:opacity-95 transition"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>

        {/* Middle divider */}
        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm">
            © {year} Made with passion by{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              Jaydipsinh Padhiyar
            </span>
          </p>

          <div className="flex items-center gap-3">
            <a
              href="#top"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-orange-500 hover:text-white dark:border-gray-700 dark:bg-slate-800/60 dark:text-gray-200 transition"
              aria-label="Back to top"
              title="Back to top"
            >
              <FaArrowUp />
              <span className="hidden sm:inline">Back to top</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
