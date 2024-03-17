import React from 'react'
import { Link, NavLink } from 'react-router-dom'
// import logo from " . /src/assets/logo-2.png" 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faCartShopping, faStore, faSun } from '@fortawesome/free-solid-svg-icons';


export default function Header() {
    return (
        <header className=" sticky z-50 top-0 flex flex-col">

            <nav className=" bg-black text-gray-400 px-4 lg:px-6 py-2.5 text-xl">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src="./src/assets/logo.png"
                            className=" h-12 w-32"
                            alt="Logo"
                        />
                    </Link>
                    <div className="flex items-center lg:order-2">

                        <Link
                            to="/signin"
                            className="text-gray-800 bg-gray-50 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            <div className=' w-16 justify-between flex'>
                                <span><FontAwesomeIcon icon={faUserPlus} /></span>
                                <h3>Log in</h3>
                            </div>

                        </Link>
                        <Link
                            to="/signup"
                            className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            <h3>Sign Up</h3>

                        </Link>

                    </div>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-primary-1250" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-white lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-primary-1250" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-white lg:p-0`
                                    }
                                >
                                    Feauters
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/product"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-primary-1250" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-white lg:p-0`
                                    }
                                >
                                    Get Started
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/contactUs"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-primary-1250" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-white lg:p-0`
                                    }
                                >
                                    Contact Us
                                </NavLink>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
            <hr />
        </header>
    );
}