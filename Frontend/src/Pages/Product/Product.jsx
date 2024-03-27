import React, { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import SearchBox from '../../Components/SearchBox/SearchBox';
import History from '../../Components/Historybox/History';
import { useSelector } from 'react-redux';
import Avataricon from '../../Components/Avataricon/Avataricon';
import { useState } from 'react';
import MarkdownComponent from '../../Components/Markdown/MarkdownComponent';


const Product = () => {
  const user = useSelector(state => state.user);
  const navigate = useNavigate(); // Initialize navigate
  console.log(user);
  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
    
  }, [ navigate]);

  if (!user) {
    return null; 
  }
  

  return (
    <div>


      <nav class="fixed flex items-center justify-between top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-black dark:border-gray-700 px-3 py-3 lg:px-5 lg:pl-3">
            <div className=' w-1/2'>
              <SearchBox />
            </div>

            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto "
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


            <div class="flex items-center justify-center">
              <div class="flex items-center">
              <Avataricon/>
               
              </div>
            </div>

          
      </nav>

      <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-black dark:border-gray-700" aria-label="Sidebar">
        <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-black">
          <ul class="space-y-2 font-medium">

            <History />
          </ul>
        </div>
      </aside>


      <div class="p-4 sm:ml-64 bg-black min-h-screen">
        <div class="p-4 b  rounded-lg dark:border-gray-700 mt-14">
          <div class="grid grid-cols-3 gap-4 mb-4">
            <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">

                Recomendation 1
              </p>
            </div>
            <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                Recomendation 2
              </p>
            </div>
            <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                Recommendation 3
              </p>
            </div>
          </div>
          <div class="flex items-center justify-center h-96 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
              <MarkdownComponent />
            </p>
          </div>

          <div class="flex items-center justify-between h-14 mb-4 rounded bg-gray-50 dark:bg-gray-800 pr-3">
            <div className=' h-auto w-96 ce flex items-center justify-between p-8'>
              <button>

              </button>
              <button>

              </button>

              <button>

              </button>

            </div>
            <div className=' h-full w-auto  flex items-center justify-center'>
              <button type="button" class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  w-64 h-12">Test your knowledge with a Quiz</button>
            </div>
          </div>

        </div>
      </div>



    </div>
  );
}

export default Product;







