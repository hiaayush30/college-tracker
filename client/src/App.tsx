import React, { useState } from 'react';
import { Container, Grid } from "@mui/material";
import Navbar from "./components/Navbar";
import { useNavigate } from 'react-router-dom';

function App() {
    const navigate = useNavigate();

    const renderContent = () => {
        return (
            <div className="flex min-h-[calc(100vh-64px)] py-12 md:py-0 flex-col md:flex-row">
                <div className='h-full my-auto'>
                    <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left px-4">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900 dark:text-slate-50 tracking-tight">
                            Effortlessly manage assignments, tests, and share solutions.
                        </h1>
                        <p className="mt-6 text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-xl">
                            Streamline your academic life with our intuitive platform. Keep track of deadlines, ace your exams, and collaborate with peers like never before.
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                            <button
                                onClick={() => navigate("/signup")}
                                className="flex-shrink-0 px-8 py-4 rounded-full bg-indigo-600 text-white text-lg font-semibold hover:bg-indigo-700 transition-all duration-300 ease-in-out shadow-lg transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                            >
                                Get Started Free
                            </button>
                            <button
                                onClick={() => navigate("/login")}
                                className="flex-shrink-0 px-8 py-4 rounded-full border-2 border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 text-lg font-semibold hover:bg-indigo-50 dark:hover:bg-slate-700 transition-all duration-300 ease-in-out shadow-md transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Image */}
                <div className='h-full my-auto'>
                    <div className="flex justify-center md:justify-end px-4">
                        <img
                            className="rounded-xl shadow-2xl lg:max-w-[40vw] h-auto object-cover transform transition-transform duration-500 hover:scale-105"
                            src="./hero.avif" // Modern placeholder image
                            alt="college-tracker"
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="dark:bg-slate-900 bg-gray-50 dark:text-slate-200 transition-colors duration-300 min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center">
                <Container maxWidth="xl">
                    {renderContent()}
                </Container>
            </div>
        </div>
    );
}

export default App;
