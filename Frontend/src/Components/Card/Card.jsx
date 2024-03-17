import React from 'react';


const Card = () => {
  return (

<div
  class="group flex flex-col justify-start items-start gap-2  duration-500 relative rounded-lg p-4 bg-gray-1000 hover:-translate-y-2 hover:shadow-xl shadow-gray-800 w-3/4 h-3/5"
>
  <div
    alt="image here"
    class="absolute duration-700 shadow-md group-hover:-translate-y-4 group-hover:-translate-x-4 -bottom-16 -right-10 w-1/2 h-3/5 rounded-lg bg-gray-900"
  >
    <img src=" " alt="" />
  </div>


    {/* <h2 class="text-2xl font-bold mb-2 text-gray-100">Dark Card</h2> */}
    <div class="bg-gray-transparent p-8">
    <h2 class="text-3xl font-bold mb-4 text-yellow-500">About GeniousGen</h2>
    <p class="text-lg text-white leading-relaxed">
        Welcome to GeniousGen, your ultimate destination for intellectual growth and fun learning! 
        Our mission is to empower minds through a fusion of enlightening blog content and captivating quizzes.
    </p>
    <p class="text-lg text-white leading-relaxed mt-4 text-left w-1/2">
        At GeniousGen, we believe that knowledge is the ultimate superpower, and we're here to equip 
        you with the tools you need to unlock your full potential. Immerse yourself in our curated 
        blog posts, crafted by AI to spark curiosity and inspire discovery. Then, put your intellect 
        to the test with our thought-provoking quizzes, designed to challenge and entertain.
    </p>



    <button type="button" class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-6">Explore</button>

  
  </div>
</div>




  );
}

export default Card;
