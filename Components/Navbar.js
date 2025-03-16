import React from "react";
import Link from "next/link";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useState, useEffect } from "react";

const Navbar = () => {
  // Dark mode state can be maintained globally or via a context.
  // For simplicity, we use local state and store preference in localStorage.
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check stored preference
    const storedMode = localStorage.getItem("darkMode");
    if (storedMode === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  return (
    <nav className="sticky top-0 z-50 py-5 px-10 shadow-sm flex justify-between border-b-2 bg-opacity-50 bg-white dark:bg-slate-900">
      <h1 className="text-xl text-neutral-900 dark:text-white font-burtons font-semibold hover:text-orange-500">
        <Link href="/">Jaydipsinh Padhiyar</Link>
      </h1>
      <ul className="flex items-center">
        <li>
          <BsFillMoonStarsFill onClick={toggleDarkMode} className="cursor-pointer text-2xl dark:text-slate-50" />
        </li>
        <li>
          <a
            href="https://drive.google.com/file/d/1Qnkz8tM8R5gZ7tKlJO0h-Y0x2q1nns1x/view?usp=sharing"
            className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-md ml-8 hover:from-pink-500 hover:to-yellow-500"
          >
            Resume
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
