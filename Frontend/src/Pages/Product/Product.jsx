import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import SearchBox from '../../Components/SearchBox/SearchBox';
import History from '../../Components/Historybox/History';
import { useSelector, useDispatch } from 'react-redux';
import MarkdownComponent from '../../Components/Markdown/MarkdownComponent';
import { axiosInstance } from '../../../utils';
import { setLoading, setUser, setQuiz } from '../../../features/userSlice';
import Header from '../../Components/Header/Header';
import {  faArrowUpRightFromSquare, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { generateText, regenerateText , knowMore} from '../../../actions/authActions';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const Product = () => {
  const user = useSelector(state => state.user);
  const text = useSelector(state => state.generatedText);
  const histId = useSelector(state => state.historyId);
  const navigate = useNavigate(); // Initialize navigate
  const [histories, setHistories] = useState([]); // Initialize histories state
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user && state.isLoading);
  
  


  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [user]);

  // Fetch histories data
  useEffect(() => {
    dispatch(setLoading(true));
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/history/getAllHistory');
        setHistories(response.data.histories); 
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [text]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // console.log(histId);
      await dispatch(regenerateText(histId));
      toast.success('Response regenerated successfully')
    } catch (error) {
      console.log(error);
    }
  }


  const handleLink = async (e) => {
    e.preventDefault();
    try {
      await dispatch(knowMore(histId));
    } catch (error) {
      console.log(error);
    }
  }



  // Render the History component only when histories array is not empty
  return (

    <div className='sm:ml-64 bg-black min-h-screen md:p-9 p-4 relative flex flex-col overflow-hidden'>

      <div className='fixed top-0 left-0 z-50 w-full'>

        <Header />
        <SearchBox histories={histories}/>
        <hr />

      </div>
      <div className=" bg-black min-h-screen  p-4 relative flex flex-col  ">
        <div className=' flex gap-2 justify-center items-center'>
          <aside id="logo-sidebar" class="fixed  top-0 left-0  w-64 h-screen pt-20 transition-transform -translate-x-full  border-r  sm:translate-x-0 bg-black border-gray-700 mt-16" aria-label="Sidebar">
            <div class="h-full px-3 pb-4 overflow-y-auto bg-black">
            <ul className="space-y-2 font-medium">
                    {histories.length === 0 ? (
                  <div className="text-white min-h-96 flex justify-center items-center">No history available</div>
                               ) : (
                     <History histories={histories} />
                )}
              </ul>
            </div>
          </aside>
          <div className={`flex md:text-2xl text-sm font-bold md:p-12 p-6 text-white flex-col gap-6 min-h-96 mb-4 rounded  bg-gray-800 mt-32 md:min-w-fit w-full relative ${isLoading ? 'h-96' : 'h-auto'}`}>
            {isLoading && (
              <div className="loader absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-10 bg-slate-900 flex-col gap-2">
                <img src="/images/loader.gif" alt="loadergif" />
                <span className="text-white text-lg">Processing... Just a moment</span>
              </div>
            )}
            {!isLoading && <MarkdownComponent />}
        

          </div>



        </div>
        {text!='' ? (
        <div class="flex items-center justify-between h-44 md:h-16 mb-4 rounded bg-gray-800 pr-3 flex-col md:flex-row ">
          <div className=' h-auto w-44 ce flex items-center justify-between p-8 gap-4'>
            <button className=' hover: bg-lime-400  border-lime-600 rounded-md p-2 w-10 text-white text-xl' onClick={(e) => handleClick(e)} title='Regenerate' >

              <FontAwesomeIcon icon={faRedoAlt} />
              
            </button>

            <button className='hover: bg-lime-400  border-lime-600 rounded-md p-2 text-white text-xl w-10' title='Know More' onClick={(e) => handleLink(e)}>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </button>
          </div>
          <div className=' h-full w-auto  flex items-center justify-center'>
            <Link to="/quiz" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  w-64 h-12 relative z-40">Test your knowledge with a Quiz</Link>
          </div>
        </div>):(
          <div class="flex items-center justify-between h-44 md:h-16 mb-4 rounded bg-gray-800 pr-3 flex-col md:flex-row ">

          </div>
          
        )
  }
      


      </div>
    </div>
  );
}

export default Product;
