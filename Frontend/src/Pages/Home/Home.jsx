import React, { useState, useEffect } from 'react';
import Card from '../../Components/Card/Card';
import Feauters from '../../Components/Feauters/Feauters';
import ContactUs from '../../Components/ContactUs/ContactUs';
import { useSelector } from 'react-redux';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom';

const Home = () => {
  const videoId = 'QCJET0iawEs';

  // Options for the YouTube player
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0, // Autoplay disabled
    },
  };
 
  return (
  
    <div className="bg-black min-h-screen relative">
      <div className=' h-screen'>
        <img
          src='/images/shape-2.png'
          alt="Background"
          className="w-96 h-96 "
        />

        <img
          src='/images/shape-4.png'
          alt="Background"
          className="absolute right-0 h-1/3  rotate-180"
        />
      < div className='absolute md:right-36 sm:right-36 right-4 top-80 mt-40 md:top-44 md:h-80 md:w-1/3 border-4 rounded-lg sm:top-96 sm:mt-20 sm:h-60 sm:w-2/3 md:mt-0 justify-center items-center flex h-60 w-11/12 '>
        {/* YouTube video */}
        
          <YouTube videoId={videoId} opts={opts} className='absolute top-0 left-0 w-full h-full' />
        

        </div>

        <div className=' text-6xl md:left-20 sm:left-20 left-7 absolute md:top-48 text-white font-rubik-doodle-shadow flex flex-col gap-6 md:w-2/4 justify-center sm:top-5 sm:w-4/5 top-4'>
          <h1 className=' md:text-6xl text-5xl text-white font-rubik-doodle-shadow font-extrabold'>
            Genius Gen
          </h1>
          <p className=' md:text-lg sm:text-lg text-base w-11/12  text-white font-rubik-doodle-shadown md:w-4/5 font-bold sm:w-full'>
            Welcome to GeniusGen, your ultimate destination for intellectual growth and fun learning! Our mission is to empower minds through a fusion of enlightening blog content and captivating quizzes.

            At GeniusGen, we believe that knowledge is the ultimate superpower, and we're here to equip you with the tools you need to unlock your full potential. Immerse yourself in our curated blog posts, crafted by AI to spark curiosity and inspire discovery. Then, put your intellect to the test with our thought-provoking quizzes, designed to challenge and entertain.
          </p>
          <Link to='/about' type="button" class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-64 h-12">Know More</Link>
        </div>
      </div>

      <div className=' h-screen w-full flex flex-col gap-14 items-center '>
        <h1 className=' text-white md:text-6xl font-extrabold z-20 sm:text-5xl sm:mt-8 md:mt-0 mt-0 text-3xl'>Know About GeniusGen</h1>

        <Card />

      </div>
      <div className=' h-1/2'>
        <Feauters />
      </div>

      <div>
        <ContactUs/>
      </div>

    </div>
  );
}

export default Home;
