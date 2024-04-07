import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { setLoading } from '../../../features/userSlice';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [error, setError] = useState(null); // Error state
  const isLoading = useSelector((state) => state.user && state.isLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsClicked(true);
    dispatch(setLoading(true));

    try {
      await dispatch(login({ email, password }, navigate));
      // Reset the error state upon successful login
      setError(null);
    } catch (error) {
      console.error(error);
      // Set the error state if there's an error during login
      setError("An error occurred. Please try again.");
    } finally {
      dispatch(setLoading(false));
      setIsClicked(false); // Reset isClicked after login attempt
    }
  };

  return (
    <section className="bg-gray-900 min-h-screen flex ">
      <div className="flex flex-col items-center justify-center  w-4/5 mx-auto md:h-screen lg:py-0">
        <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <img className="md:w-64 md:h-32 w-48 h-20" src="/images/logo.png" alt="logo" />
        </Link>
        <div className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
              Sign in to your account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="name@company.com" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required />
              </div>

              <button type="submit" className="w-full text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800" disabled={isLoading || isClicked}>
                {isClicked ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin className="text-white mr-2" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
              {error && <p className="text-red-500">{error}</p>}
              <p className="text-sm font-light text-gray-400">
                Don’t have an account yet? <Link to="/signup" className="font-medium  hover:underline text-primary-500">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
