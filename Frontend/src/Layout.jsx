import React, { useEffect } from 'react';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../utils'; // Assuming axiosInstance is correctly exported from '../utils'
import { setUser } from '../features/userSlice';

function Layout() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axiosInstance.get('/api/v1/users/showMe');
  //       const user = response.data.user;
  //       dispatch(setUser(user));
  //     } catch (error) {
  //       console.log('Error fetching user data:', error);
  //     }
  //   };

  //   fetchData(); 

  // }, []); 

  return (
    <>
      <Header />
      <Outlet /> 
      <Footer />
    </>
  );
}

export default Layout;
