import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const History = (props) => {
    const histories = props.histories || []; // Provide a default value for histories if it's undefined
    const [activeHistory, setActiveHistory] = useState(null);

    const handleClick = (historyId) => {
        setActiveHistory(activeHistory === historyId ? null : historyId); // Toggle active state
    }

    return (
        <ul className="space-y-1">
            {histories.map(history => (
                <li key={history._id}>
                    <Link to="#" className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-500 group hover:bg-gray-700 hover:text-white relative ${activeHistory === history._id ? 'activeHistory' : ''}`}>
                        <svg className={`w-5 h-5 text-gray-500 transition duration-75 ${activeHistory === history._id ? 'dark:text-white' : 'dark:text-gray-800'} group-hover:text-gray-900 dark:group-hover:text-white`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                        </svg>
                        {/* Display history title */}
                        <span className="ms-3 capitalize ">{history.title}</span>
                        <button className="absolute bottom-2 mt-2 mr-2 text-xs text-green-700" style={{ right: '0rem' }} onClick={() => handleClick(history._id)}>
                            Click to {activeHistory === history._id ? 'hide' : 'show'}
                        </button>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default History;
