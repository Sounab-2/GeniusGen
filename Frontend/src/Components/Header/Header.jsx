import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faBars, faSignOut } from '@fortawesome/free-solid-svg-icons';
import Avataricon from '../Avataricon/Avataricon';
import { useSelector } from 'react-redux';


export default function Header() {
    const user = useSelector(state => state.user);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    

    const toggleMobileNav = () => {
        setIsMobileNavOpen(!isMobileNavOpen);
    };
   

    return (
        <header className="sticky z-50 top-0 flex flex-col">
            <nav className="bg-black text-gray-400 px-4 lg:px-6 py-2.5 text-xl">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src="/images/logo.png"
                            className="h-12 w-32 md:block hidden"
                            alt="Logo"
                        />
                    </Link>
                    <span onClick={toggleMobileNav}
                        className=' absolute left-5'>
                        <FontAwesomeIcon icon={faBars} className="md:hidden" />
                    </span>
                    {user ? (
                        <div className="flex items-center lg:order-2">
                            <Avataricon/>
                        </div>


                    ) : (
                        <div className="flex items-center lg:order-2">
                            <Link
                                to="/signin"
                                className="text-gray-800 bg-gray-50 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                            >
                                <div className='w-16 justify-between flex'>
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
                    )}

                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-primary-1250" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-white lg:p-0`
                                    }
                                    activeClassName="text-primary-1250"
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
                                    Features
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/product"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-primary-1250" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-white lg:p-0`
                                    }
                                    activeClassName="text-primary-1250"
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
                                    activeClassName="text-primary-1250"
                                >
                                    Contact Us
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Mobile Navbar */}
            <div className={`lg:hidden ${isMobileNavOpen ? 'block' : 'hidden'} bg-gray-800 relative z-20 `}>
                <ul className="flex flex-col  font-medium lg:flex-row lg:space-x-8 lg:mt-0 ">
                    <li>
                        <NavLink
                            to="/"
                            className="block py-2 pr-4 pl-3 duration-200 text-gray-700 border-b hover:bg-gray-700 border-gray-100  lg:hover:bg-transparent lg:border-0 hover:text-white lg:p-0"
                            activeClassName="text-primary-1250"
                            onClick={toggleMobileNav}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            className="block py-2 pr-4 pl-3 duration-200 text-gray-700 border-b hover:bg-gray-700 border-gray-100  lg:hover:bg-transparent lg:border-0 hover:text-white lg:p-0"
                            activeClassName="text-primary-1250"
                            onClick={toggleMobileNav}
                        >
                            Features
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/product"
                            className="block py-2 pr-4 pl-3 duration-200 text-gray-700 border-b hover:bg-gray-700 border-gray-100 lg:hover:bg-transparent lg:border-0 hover:text-white lg:p-0"
                            activeClassName="text-primary-1250"
                            onClick={toggleMobileNav}
                        >
                            Get Started
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/contactUs"
                            className="block py-2 pr-4 pl-3 duration-200 text-gray-700 border-b hover:bg-gray-700 border-gray-100  lg:hover:bg-transparent lg:border-0 hover:text-white lg:p-0"
                            activeClassName="text-primary-1250"
                            onClick={toggleMobileNav}
                        >
                            Contact Us
                        </NavLink>
                    </li>
                </ul>

            </div>
            <hr />
        </header>
    );
}
