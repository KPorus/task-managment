import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="relative bg-deep-purple-accent-400">
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
                    <h2 className="mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                        The quick, brown fox
                        <br className="hidden md:block" />
                        jumps over a{' '}
                        <span className="relative inline-block px-2">
                            <div className="absolute inset-0 transform -skew-x-12 bg-teal-accent-400" />
                            <span className="relative text-teal-900">lazy dog</span>
                        </span>
                    </h2>
                    <p className="mb-6 text-base text-indigo-100 md:text-lg">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                        quae. explicabo. Sed ut perspiciatis unde omnis.
                    </p>
                    <p className="max-w-md mb-10 text-xs tracking-wide text-indigo-100 sm:text-sm sm:mx-auto md:mb-16">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                        accusantium doloremque.
                    </p>
                    <Link
                        to="/"
                        aria-label="Scroll down"
                        className="flex items-center justify-center w-32 h-10 mx-auto text-white duration-300 transform border border-gray-400  hover:text-teal-accent-400 hover:border-teal-accent-400 hover:shadow hover:scale-110"
                    >
                        Get started
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;