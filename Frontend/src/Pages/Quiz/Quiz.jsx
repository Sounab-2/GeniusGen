import { useState } from 'react';
import { quiz } from './QuizStore';

const Quiz = () => {
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

    const { questions } = quiz;
    const { question, choices, correctAnswer } = questions[activeQuestion];

    const onClickNext = () => {
        if (activeQuestion !== questions.length - 1) {
            setActiveQuestion((prev) => prev + 1);
            setSelectedAnswer('');
            setSelectedAnswerIndex(null);
            setAnswered(false); // Reset answered state for the next question
        } else {
            setShowResult(true);
        }
    };

    const onAnswerSelected = (answer, index) => {
        if (!answered) { // Allow selection only if an answer hasn't been selected yet
            setSelectedAnswerIndex(index);
            setSelectedAnswer(answer);
            const isCorrect = answer === correctAnswer;
            setResult((prev) => ({
                ...prev,
                score: isCorrect ? prev.score + 1 : prev.score,
                correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
                wrongAnswers: isCorrect ? prev.wrongAnswers : prev.wrongAnswers + 1,
            }));
            setAnswered(true); // Set answered state to true once an answer is selected
        }
    };

    const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

    return (
        <section className=' w-full min-h-screen bg-black flex justify-center items-center'>
            <div>

                {!showResult ? (
                    <div className=" max-w-screen-md mx-auto bg-gray-900 rounded-lg mt-20 px-6 py-12">
                        <img
                            src='./src/assets/shape-4.png'
                            alt="Background"
                            className="absolute right-0 h-2/3 w-64  rotate-180"
                        />
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-white text-4xl font-semibold">
                                {addLeadingZero(activeQuestion + 1)}
                            </span>
                            <span className="text-gray-500 text-lg">
                                /{addLeadingZero(questions.length)}
                            </span>
                        </div>
                        <h2 className="text-2xl text-slate-50 font-semibold mb-4">{question}</h2>
                        <ul className="mb-8">
                            {choices.map((choice, index) => (
                                <li
                                    key={choice}
                                    onClick={() => onAnswerSelected(choice, index)}
                                    className={`border border-gray-300 rounded-lg py-3 px-4 text-white font-bold cursor-pointer mb-4 ${answered && selectedAnswerIndex === index
                                        ? choice === correctAnswer
                                            ? ' border-green-600 bg-green-400'
                                            : 'border-red-600 bg-red-400'
                                        : ''
                                        } ${answered && choice === correctAnswer && selectedAnswerIndex !== index
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
                                disabled={!answered} // Disable next button if no answer is selected
                                className=" py-3 px-8 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg   text-center "
                            >
                                {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="">
                        <h3 className="text-2xl font-extrabold text-white  mb-4">Well done! You got {result.correctAnswers} out of {questions.length}  right. Keep up the good work!</h3>
                      
                    </div>
                )}
            </div>
        </section>
    );
};

export default Quiz;
