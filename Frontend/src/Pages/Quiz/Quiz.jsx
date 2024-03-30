
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GaugeComponent from 'react-gauge-component';
import { generateQuiz } from '../../../actions/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { setLoading } from '../../../features/userSlice';


const Quiz = () => {
    const user = useSelector(state => state.user);
    const qsns = useSelector(state => state.quiz);
    const histId = useSelector(state => state.historyId);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigate
    const isLoading = useSelector((state) => state.user && state.isLoading);
    useEffect(() => {
        if (!user) {
            navigate('/signin');
        }
    }, [user]);

    useEffect(() => {
        dispatch(setLoading(true));
        const fetchData = async () => {
            try {
                await dispatch(generateQuiz(histId));
            } catch (error) {
                console.error(error);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchData();
    }, []);

    const [activeQuestion, setActiveQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [result, setResult] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    });
    const [answered, setAnswered] = useState(false); // Track if an answer has been selected

    if (!qsns || !qsns.mcqQuestions) {
        return <>
            <div className="loader absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-10 bg-slate-900 flex-col gap-2">
              <img src="/images/loader.gif" alt="" />
              <span className="text-white text-lg">Processing... Just a moment</span>
            </div>
            </>
          // Handle the case when mcqQuestions is null or undefined
    }

    const { mcqQuestions } = qsns;

    const onClickNext = () => {
        if (activeQuestion !== mcqQuestions.length - 1) {
            setActiveQuestion(prev => prev + 1);
            setSelectedAnswer('');
            setSelectedAnswerIndex(null);
            setAnswered(false); // Reset answered state for the next question
        } else {
            setShowResult(true);
        }
    };

    const onAnswerSelected = (answer, index) => {
        if (!answered) {
            setSelectedAnswerIndex(index);
            setSelectedAnswer(answer);
            const isCorrect = answer === mcqQuestions[activeQuestion].correctAnswer;
            setResult(prev => ({
                ...prev,
                score: isCorrect ? prev.score + 1 : prev.score,
                correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
                wrongAnswers: isCorrect ? prev.wrongAnswers : prev.wrongAnswers + 1,
            }));
            setAnswered(true);
        }
    };

    const addLeadingZero = number => (number > 9 ? number : `0${number}`);

    return (
        <section className="w-full min-h-screen bg-black flex justify-center items-center">
            {isLoading && (
                <div className="loader absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-10 bg-slate-900 flex-col gap-2">
                    <img src="/images/loader.gif" alt="" />
                    <span className="text-white text-lg">Processing... Just a moment</span>
                </div>
            )}


            <div className=' flex justify-center items-center'>
                {!showResult ? (
                    <div className="w-96 md:w-2/3 bg-gray-900 rounded-lg mt-20 px-6 py-12">
                        <img
                            src="/images/shape-4.png"
                            alt="Background"
                            className="absolute right-0 h-2/3 w-64 rotate-180 hidden md:block"
                        />
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-white text-4xl font-semibold">
                                {addLeadingZero(activeQuestion + 1)}
                            </span>
                            <span className="text-gray-500 text-lg">/{addLeadingZero(mcqQuestions.length)}</span>
                        </div>
                        <h2 className="text-2xl text-slate-50 font-semibold mb-4">
                            {mcqQuestions[activeQuestion].question}
                        </h2>
                        <ul className="mb-8">
                            {mcqQuestions[activeQuestion].choices.map((choice, index) => (
                                <li
                                    key={choice}
                                    onClick={() => onAnswerSelected(choice, index)}
                                    className={`border border-gray-300 rounded-lg py-3 px-4 text-white font-bold cursor-pointer mb-4 ${answered && selectedAnswerIndex === index
                                        ? choice === mcqQuestions[activeQuestion].correctAnswer
                                            ? ' border-green-600 bg-green-400'
                                            : 'border-red-600 bg-red-400'
                                        : ''
                                        } ${answered && choice === mcqQuestions[activeQuestion].correctAnswer && selectedAnswerIndex !== index
                                            ? ' border-green-600 bg-green-400'
                                            : ''
                                        }`}
                                >
                                    {choice}
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-end">
                            <button
                                onClick={onClickNext}
                                disabled={!answered}
                                className="py-3 px-8 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg   text-center"
                            >
                                {activeQuestion === mcqQuestions.length - 1 ? 'Finish' : 'Next'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center gap-6 bg-gray-800 rounded-lg p-14 md:w-auto w-96 ">
                        <div className="bg-gray-700 h-72 w-72 flex items-center justify-center rounded-full">
                            <GaugeComponent
                                arc={{
                                    subArcs: [
                                        {
                                            limit: 20,
                                            color: '#EA4228',
                                            showTick: true,
                                        },
                                        {
                                            limit: 40,
                                            color: '#F58B19',
                                            showTick: true,
                                        },
                                        {
                                            limit: 60,
                                            color: '#F5CD19',
                                            showTick: true,
                                        },
                                        {
                                            limit: 100,
                                            color: '#5BE12C',
                                            showTick: true,
                                        },
                                    ],
                                }}
                                value={(result.correctAnswers / mcqQuestions.length) * 100}
                                animate={true}
                            />
                        </div>
                        <h3 className="text-2xl font-extrabold text-white mb-4">
                            {result.correctAnswers >= 5 ? (
                                `Well done! You got ${result.correctAnswers} out of ${mcqQuestions.length} right. Keep up the good work!`
                            ) : (
                                `Try harder next time. You got ${result.correctAnswers} out of ${mcqQuestions.length} correct.`
                            )}
                        </h3>
                        <h3 className="text-2xl font-extrabold text-yellow-600 mb-4">{`Your Total Score : ${result.correctAnswers}/${mcqQuestions.length}`}</h3>
                        <Link
                            to="/product"
                            className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            {result.correctAnswers >= 5 ? 'Prepare Another topic' : 'Prepare Again'}
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Quiz;