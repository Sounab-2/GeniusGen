import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../../utils/index';
import { useSelector, useDispatch } from "react-redux";
import { setGeneratedText, setHistoryId, setLoading ,setActiveHistory} from "../../../features/userSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {toast} from 'react-toastify'


const History = (props) => {
    const [histories, setHistories] = useState(props.histories || []);
    const generatedText = useSelector(state => state.generatedText);
    const activeHistory = useSelector(state=> state.activeHistory);
    const dispatch = useDispatch();

    useEffect(() => {
        setHistories(props.histories || []);
    }, [props.histories]);

    const handleClick = async (histId) => {
        dispatch(setActiveHistory(activeHistory === histId ? null : histId));
        try {
            const response = await axiosInstance.get(`/api/v1/history/${histId}`);
            dispatch(setGeneratedText(response.data.content.body));
            dispatch(setHistoryId(histId));
        } catch (error) {
            console.log(error);
        }
    }

    

    const handleDelete = async (historyId) => {
        dispatch(setLoading(true));
        try {
            await axiosInstance.delete(`/api/v1/history/deleteHistory/${historyId}`);
            // Update local state to remove the deleted history item
            setHistories(histories.filter(history => history._id !== historyId));
            dispatch(setGeneratedText(''));
            toast.success('History deleted successfully');
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
    }

    return (
        <ul className="space-y-1">
            {histories.map(history => (
                <li key={history._id}>
                    <Link to="#" className={`flex items-center p-2 text-gray-500 group hover:bg-gray-700 hover:text-white relative ${activeHistory === history._id ? 'activeHistory' : ''}`}>
                        <svg className={`w-5 h-5 text-gray-500 transition duration-75 ${activeHistory === history._id ? 'text-white' : 'text-gray-800'} group-hover:text-white`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                        </svg>
                        <button onClick={() => handleClick(history._id)}>
                            <span className="ms-3 capitalize ">{history.title}</span>
                        </button>
                        <button className="absolute bottom-2 mt-2 mr-2 text-xs text-red-600" style={{ right: '0rem' }} onClick={() => handleDelete(history._id)} title='Delete' >
                        <span><FontAwesomeIcon icon={faTrash} /></span>
                        </button>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default History;

