import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <section class="flex flex-col h-screen justify-center items-center bg-gray-100 min-h-screen">
    <div class="flex flex-col items-center gap-36">
        {/* <h1 class="text-[120px] font-extrabold text-gray-700">404</h1> */}
        <div className=' w-96 h-1/2'>
            <img src="./images/404.png" alt="" />
        </div>
        {/* <p class="text-2xl font-medium text-gray-600 mb-6">Page Not Found</p> */}
        <Link to="/"
            class="px-4 py-2 font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 transition-all duration-200 ease-in-out">
            Go Home
        </Link>
    </div>
</section>
  );
}

export default Error;
