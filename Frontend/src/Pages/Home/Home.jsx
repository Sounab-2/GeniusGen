import React, { useState, useEffect } from 'react';
import Card from '../../Components/Card/Card';
import Feauters from '../../Components/Feauters/Feauters';
import ContactUs from '../../Components/ContactUs/ContactUs';
// import './src/index.css';

const Home = () => {


  return (

    <div className="bg-black min-h-screen relative">
      <div className=' h-screen'>
        <img
          src='./src/assets/shape-2.png'
          alt="Background"
          className="absolute top-16 left-0 h-1/2 w-3/4"
        />

        <img
          src='./src/assets/shape-4.png'
          alt="Background"
          className="absolute right-0 h-1/3  rotate-180"
        />
        <div class='absolute right-36 top-44 h-80 w-1/3 border-4 rounded-lg'>
          <iframe width="100%" height="100%" src="https://youtu.be/QM-tDK7lurA?si=8MWI47pC1M7aB-FO" frameborder="0" allowfullscreen></iframe>

        </div>

        <div className=' text-6xl left-20 absolute top-48 text-white font-rubik-doodle-shadow flex flex-col gap-6 w-2/4 justify-center'>
          <h1 className=' text-6xl text-white font-rubik-doodle-shadow font-extrabold'>
            Genious Gen
          </h1>
          <p className=' text-lg  text-white font-rubik-doodle-shadown w-4/5 font-bold'>
            Welcome to GeniusGen, your ultimate destination for intellectual growth and fun learning! Our mission is to empower minds through a fusion of enlightening blog content and captivating quizzes.

            At GeniusGen, we believe that knowledge is the ultimate superpower, and we're here to equip you with the tools you need to unlock your full potential. Immerse yourself in our curated blog posts, crafted by AI to spark curiosity and inspire discovery. Then, put your intellect to the test with our thought-provoking quizzes, designed to challenge and entertain.
          </p>
          <button type="button" class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-64 h-12">Know More</button>
        </div>
      </div>

      <div className=' h-screen w-full flex flex-col gap-14 items-center '>
        <h1 className=' text-white text-6xl font-extrabold'>Know About GeniusGen</h1>

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
