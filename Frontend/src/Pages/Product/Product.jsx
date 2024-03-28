import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import SearchBox from '../../Components/SearchBox/SearchBox';
import History from '../../Components/Historybox/History';
import { useSelector } from 'react-redux';
import Avataricon from '../../Components/Avataricon/Avataricon';
import MarkdownComponent from '../../Components/Markdown/MarkdownComponent';
import { axiosInstance } from '../../../utils';



const Product = () => {
  const user = useSelector(state => state.user);
  const text = useSelector(state => state.generatedText);
  const navigate = useNavigate(); // Initialize navigate
  const [histories, setHistories] = useState([]); // Initialize histories state

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [user]);

  // Fetch histories data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/history/getAllHistory');
        setHistories(response.data.histories); // Set histories state after fetching data
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [text]);

  // Render the History component only when histories array is not empty
  return (
    <div className=' overflow-hidden'>
      <nav class="fixed flex items-center justify-between   top-0 z-50 md:w-full min-w-full overflow-hidden bg-white border-b border-gray-200 dark:bg-black dark:border-gray-700 px-3 py-3 lg:px-5 lg:pl-3">
        <div className=' w-1/2'>
          <SearchBox />
        </div>

        <div
          className="hidden justify-between items-center w-full lg:flex lg:w-auto "
          id="mobile-menu-2"
        >
          <nav>
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
          </nav>
        </div>

        <div class="flex items-center justify-center">
          <div class="flex items-center z-30 relative">
          <Avataricon/>
          </div>
        </div>
      </nav>

      <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-black dark:border-gray-700" aria-label="Sidebar">
        <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-black">
          <ul class="space-y-2 font-medium">
            {/* Render History component only when histories array is not empty */}
            {histories.length > 0 && <History histories={histories} />}
          </ul>
        </div>
      </aside>

      <div className="sm:ml-64 bg-black min-h-screen md:p-9 p-4 relative -z-10 ">

        <div className="flex md:text-2xl text-sm font-bold md:p-12 p-6 text-white flex-col gap-6 h-auto min-h-96 mb-4 rounded bg-gray-50 dark:bg-gray-800 mt-16 md:min-w-fit w-full ">
          <MarkdownComponent />
        </div>
        <div class="flex items-center justify-between h-14 mb-4 rounded bg-gray-50 dark:bg-gray-800">
          <div className=' h-auto w-96 ce flex items-center justify-between p-8'>
            {/* Buttons */}
          </div>
          <div className=' h-full w-auto  flex items-center justify-center'>
            <Link to="/quiz" class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  w-64 h-12">Test your knowledge with a Quiz</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
