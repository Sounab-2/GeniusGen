import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link,useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {  faSignOut } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { logoutUser } from '../../../actions/authActions';


const Avataricon = () => {
    const user = useSelector(state => state.user);
    const [isLogOutOpen, setIsLogoutOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
          navigate('/signin');
        }
      }, [user]);
    const toggleLogout = () => {
        setIsLogoutOpen(!isLogOutOpen);
    }

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser(navigate));
            setIsLogoutOpen(false); // Close the logout modal after logout
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="text-white mr-4 flex items-center gap-4 relative">
            <Link onClick={toggleLogout}>
                <img
                    src="/images/avatar.png"
                    className="md:h-12 md:w-12 h-9 w-9"
                    alt="avatar"
                />
            </Link>
            <span className="font-bold text-lg md:block hidden">{user && user.name}</span>


            {/* Toggle Logout Box */}
            <div
                className={`${isLogOutOpen ? 'block' : 'hidden'
                    }  bg-gray-800 absolute z-50 md:top-14  h-14 flex items-center justify-center rounded-md rounded-s-none md:left-7 sm:right-3 md:right-0 sm:top-10  w-48 py-2 px-4 right-3 top-10`}
            >
                {/* Logout button */}
                <button className='w-full' onClick={handleLogout}>
                    <span className='flex gap-3 items-center justify-center'>
                        Logout
                        <FontAwesomeIcon icon={faSignOut} className="" />
                    </span>
                </button>
            </div>
        </div>
    );
}

export default Avataricon;
