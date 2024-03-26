import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {  faSignOut } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

const Avataricon = () => {
    const user = useSelector(state => state.user);
    const [isLogOutOpen, setIsLogoutOpen] = useState(false);
    const toggleLogout = () => {
        setIsLogoutOpen(!isLogOutOpen);
    }
    return (
        <div className="text-white mr-4 flex items-center gap-4 relative">
            <Link onClick={toggleLogout}>
                <img
                    src="./src/assets/avatar.png"
                    className="md:h-12 md:w-12 h-9 w-9"
                    alt="avatar"
                />
            </Link>
            <span className="font-bold text-lg md:block hidden">{user.name}</span>

            {/* Toggle Logout Box */}
            <div
                className={`${isLogOutOpen ? 'block' : 'hidden'
                    }  bg-gray-800 absolute md:top-14  h-14 flex items-center justify-center rounded-md rounded-s-none md:left-7 sm:right-3 md:right-0 sm:top-10  w-48 py-2 px-4 right-3 top-10`}
            >
                {/* Add logout button or any other user-related actions */}
                <button className=' w-full' onClick={toggleLogout}>

                    <span className=' flex gap-3 items-center justify-center'>
                        Logout
                        <FontAwesomeIcon icon={faSignOut} className="" />
                    </span>



                </button>
            </div>
        </div>
    );
}

export default Avataricon;
