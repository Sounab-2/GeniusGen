import React, { useState } from 'react';
// import { axiosInstance } from '../../../utils';
import { generateText } from '../../../actions/authActions';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import History from '../Historybox/History';
import { useSelector } from 'react-redux';

const SearchBox = ({ histories }) => {
    const [textInput, setTextInput] = useState('');
    const [isHistoryOpen, setHistoryOpen] = useState(false);
    const activeHistory = useSelector(state => state.activeHistory);

    const toggleHistory = () => {
        setHistoryOpen(!isHistoryOpen);
    };

    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(generateText(textInput, activeHistory));
            setTextInput('');
        } catch (error) {
            console.error('Error sending text:', error);
        }
    };

    return (
        <>
            <div className=' bg-gray-900 sticky z-40 w-full p-3 flex gap-2 justify-center items-center'>
                <form onSubmit={handleSubmit} className="flex items-center max-w-xl  mx-auto gap-3 md:gap-2">
                <div className=' flex gap-0'>
                    <label htmlFor="voice-search" className="sr-only">Search</label>
                    <div className="relative md:w-full w-64">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="voice-search"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-96 w-64 ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                            placeholder="Search Anything related to programming or computer science....."
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="inline-flex items-center py-2.5 px-3 ms-2 text-xs font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-20">
                        <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>Search
                    </button>
                    </div>
                    <span onClick={toggleHistory} className="">
                        <FontAwesomeIcon icon={faClockRotateLeft} className="md:hidden text-xl font-bold text-white" />
                    </span>
                </form>

            </div>

            {/* History box */}
            <div className={`lg:hidden absolute top-full left-0 w-44 p-3 bg-gray-900 h-fit min-h-screen text-white ${isHistoryOpen ? 'block' : 'hidden'}`}>
            {histories.length === 0 ? (
                  <div className="text-white min-h-96 flex justify-center items-center">No history available</div>
                               ) : (
                     <History histories={histories} />
                )}
            </div>
        </>
    );
}

export default SearchBox;
