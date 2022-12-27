import React from 'react';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import { FaAngleRight } from "react-icons/fa";

const Home = () => {
    document.title = "Manage your Task";
    return (
        <div className="relative bg-deep-purple-accent-400 flex lg:mt-28">
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
                    <h2 className="mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                        The quick, fast 
                        <br className="hidden md:block" />
                        & easy to use{' '}
                        <span className="relative inline-block px-2">
                            <div className="absolute inset-0 transform -skew-x-12 bg-teal-accent-400" />
                            <span style={{ color: "#4285f4", fontWeight: "bold" }}>
                                <Typewriter
                                    words={["to track your task"]}
                                    loop={1000}
                                    cursor
                                    cursorStyle='_'
                                    typeSpeed={100}
                                    deleteSpeed={50}
                                    delaySpeed={1000}
                                />
                            </span>
                        </span>
                    </h2>
                    <p className="mb-6 text-base text-indigo-100 md:text-lg">
                        Plan, organize, and collaborate on any project with powerful task management that can be customized for every need.
                    </p>
                    <Link
                        to="/signUp"
                        aria-label="Scroll down"
                        className="flex items-center justify-center w-32 h-10 mx-auto text-white duration-300 transform border border-gray-400  hover:text-teal-accent-400 hover:border-teal-accent-400 hover:shadow hover:scale-110"
                    >
                        Get started <FaAngleRight className='text-xl'></FaAngleRight>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;