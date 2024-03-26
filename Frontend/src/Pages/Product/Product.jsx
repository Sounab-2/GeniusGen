import React,{useEffect} from 'react';
import { Link, NavLink,useNavigate} from 'react-router-dom';
import SearchBox from '../../Components/SearchBox/SearchBox';
import History from '../../Components/Historybox/History';
import { useSelector } from 'react-redux';

const Product = () => {
  const user = useSelector(state => state.user);
  const navigate = useNavigate(); // Initialize navigate
  console.log(user);
  useEffect(() => {
    // Redirect to '/signin' if user is not authenticated
    if (!user) {
      navigate('/signin');
    }
  }, [user, navigate]); // Call navigate when user or navigate changes

  // If user is not authenticated, useEffect will redirect before rendering
  if (!user) {
    return null; // Return null to avoid rendering anything else
  }
  return (
    <div>


      <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-black dark:border-gray-700">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
          <div class="flex items-center justify-between">


            <div class="flex items-center">
              <div class="flex items-center ms-3">
                <div>
                  <button type="button" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                    <span class="sr-only">Open user menu</span>
                    <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
                  </button>
                </div>
                <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                  <div class="px-4 py-3" role="none">
                    <p class="text-sm text-gray-900 dark:text-white" role="none">
                      Neil Sims
                    </p>
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                      neil.sims@flowbite.com
                    </p>
                  </div>
                  <ul class="py-1" role="none">
                    <li>
                      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                    </li>
                    <li>
                      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                    </li>
                    <li>
                      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a>
                    </li>
                    <li>
                      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className=' w-1/2'>
              <SearchBox />
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





        </div>
      </nav>

      <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-black dark:border-gray-700" aria-label="Sidebar">
        <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-black">
          <ul class="space-y-2 font-medium">

            <History />
            <History />
            <History />
            <History />
            <History />
            <History />
            <History />
            <History />
            <History />
          </ul>
        </div>
      </aside>


      <div class="p-4 sm:ml-64 bg-black min-h-screen">
        <div class="p-4 b  rounded-lg dark:border-gray-700 mt-14">
          <div class="grid grid-cols-3 gap-4 mb-4">
            <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">

                Recomandation 1
              </p>
            </div>
            <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                Recomandation 2
              </p>
            </div>
            <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                Recomandation 3
              </p>
            </div>
          </div>
          <div class="flex items-center justify-center h-96 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
              Actual search answer
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
