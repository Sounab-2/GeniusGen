import React from 'react'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
    <Header/>
    <Outlet /> 
    {/* basically here we create a structure of our page that what our pages looks like , basically here two componenets are common in every pages
    one is header and another one is footer , and we declare outlet whatever children pass through the layout that will show in this outlet  */}
    <Footer />
    </>
  )
}

export default Layout;