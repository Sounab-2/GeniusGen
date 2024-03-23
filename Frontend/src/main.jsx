import React from 'react'
import ReactDOM from 'react-dom';

import './index.css' 
import { Route, Routes, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { createRoutesFromElements } from 'react-router'

import Layout from './Layout.jsx'
import Home from './Pages/Home/Home.jsx'
import About from './Pages/About/About.jsx'
// import Header from './Components/Header/Header.jsx'
import Signin from './Components/SignIn/Signin.jsx'
import Signup from './Components/SignUp/Signup.jsx'
import Product from './Pages/Product/Product.jsx';
import Explore from './Pages/Explore/Explore.jsx';
import Error from './Pages/Error/Error.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='contactUs' element={<Explore />} />
      </Route>
      <Route path='product' element={<Product />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/error' element={<Error />} />
    </>
    // we have to add this fregments otherwise this will not work
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

