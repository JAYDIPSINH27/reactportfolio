import React from "react";
import Link from 'next/link'
import { BsFillMoonStarsFill } from 'react-icons/bs'

const Navbar = () => {
    return (

        <nav className="py-5 px-10 shadow-sm  flex justify-between border-b-2 bg-opacity-50">
            <h1 className="text-xl text-neutral-900 font-burtons font-semibold hover:text-orange-500">
                <Link href="/">Jaydipsinh Padhiyar</Link>
            </h1>
            <ul className=" flex items-center">
                {/* <li><BsFillMoonStarsFill onClick={() => setDarkMode(!darkMode)} className=" cursor-pointer text-2xl" /></li> */}
                {/* Without Gradient */}
                {/* <li><a
            href="https://drive.google.com/file/d/1LsjXNVjN0uTOUAyn7cClrRr4LjIkBbOG/view?usp=share_link"
            className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2  rounded-md ml-8"
          >Resume</a></li> */}
                <li>
                    <a className="bg-cyan-500 text-white px-4 py-2  rounded-md ml-8" href="#">
                        Resume
                    </a>
                </li>
            </ul>
        </nav>

    );
};

export default Navbar;
