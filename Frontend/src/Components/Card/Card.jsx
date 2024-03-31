import React from 'react';
import { Link } from 'react-router-dom';


const Card = () => {
  return (

<div
  class="group flex flex-col justify-start items-start gap-2  duration-500 relative rounded-lg p-4 bg-gray-1000 hover:-translate-y-2 hover:shadow-xl shadow-gray-800 w-11/12 h-4/5 md:w-3/4 md:h-3/5 sm:h-2/3 sm:w-4/5"
>
  <div
    alt="image here"
    class="absolute duration-700 shadow-md group-hover:-translate-y-4 group-hover:-translate-x-4 -bottom-16 -right-10 w-1/2 h-3/5 rounded-lg bg-gray-800 md:flex justify-center items-center  sm:flex hidden"
  >
    {/* <div className=' shadow-2xl shadow-slate-50 rounded-full flex items-center justify-center h-56 w-56 bg-yellow-300 '> */}
    <img src="/images/programmer.png" alt="" className=' h-64 w-full' />
    {/* </div> */}
</div>
    {/* <h2 class="text-2xl font-bold mb-2 text-gray-100">Dark Card</h2> */}
    <div class="bg-gray-transparent p-6">
    <h2 class="md:text-3xl sm:text-3xl text-2xl font-bold mb-4 text-yellow-500">About GeniusGen</h2>
    <p class="sm:text-lg md:text-lg text-base text-white leading-relaxed ">
        Welcome to GeniusGen, your ultimate destination for intellectual growth and fun learning! 
        Our mission is to empower minds through a fusion of enlightening blog content and captivating quizzes.
    </p>
    <p class="md:text-lg text-base text-white leading-relaxed mt-4 text-left md:w-1/2 sm:text-sm sm:w-72">
        At GeniusGen, we believe that knowledge is the ultimate superpower, and we're here to equip 
        you with the tools you need to unlock your full potential. Immerse yourself in our curated 
        blog posts, crafted by AI to spark curiosity and inspire discovery. Then, put your intellect 
        to the test with our thought-provoking quizzes, designed to challenge and entertain.
    </p>



    <Link to='/product' type="button" class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-6">Explore</Link>

  
  </div>
</div>




  );
}

export default Card;
