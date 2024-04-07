import React from 'react';

const ContactUs = () => {
  
  return (
    <section class="bg-black">
       <img
          src='/images/shape-4.png'
          alt="Background"
          className="absolute right-0 h-96  rotate-180"
        />
  <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-white">Contact Us</h2>
      <p class="mb-8 lg:mb-16 font-light text-center text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a  feature? Need details about our Site? Let us know.</p>
      <form method="POST" action="https://formsubmit.co/2c8270939e92bf20e02ba5f12e2a2703" enctype="multipart/form-data" class="space-y-8">
          <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-300">Your email</label>
              <input type="email" id="email" class="shadow-sm  border  text-sm rounded-lg focus:ring-primary-500  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ring-primary-500 focus:border-primary-500 shadow-sm-light" placeholder="name@gmail.com" required/>
          </div>
          <div>
              <label for="subject" class="block mb-2 text-sm font-medium text-gray-300">Subject</label>
              <input type="text" id="subject" class="block p-3 w-full text-sm  rounded-lg border  shadow-sm  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500 shadow-sm-light" placeholder="Let us know how we can help you" required/>
          </div>
          <div class="sm:col-span-2">
              <label for="message" class="block mb-2 text-sm font-medium text-gray-400">Your message</label>
              <textarea id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900 rounded-lg shadow-sm  bg-gray-700 border-gray-600 placeholder-gray-400 dtext-white focus:ring-primary-500 focus:border-primary-500" placeholder="Leave a comment..."></textarea>
          </div>
          <button type="submit" class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-40 h-12">Send message</button>
      </form>
  </div>
</section>
  );
}

export default ContactUs;
