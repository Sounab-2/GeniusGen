      import { setLoading, setUser, logout } from '../features/userSlice';
      import {axiosInstance} from '../utils/index';


      export const register = (userData,navigate) => async (dispatch) => {
        dispatch(setLoading(true));
        try {
          const response = await axiosInstance.post('/api/v1/auth/register', userData);
          dispatch(setUser(response.data.user));
          // console.log("Account registered successfully");
          navigate('/signin');
        } catch (error) {
          console.log(error.response.data.msg);
        }
      };

      export const login = (userData,navigate) => async (dispatch) => {
        dispatch(setLoading(true));
        try {
          const response = await axiosInstance.post('/api/v1/auth/login', userData);
          dispatch(setUser(response.data.user));
          navigate('/product');
          console.log("Logged in successfully");

        } catch (error) {
          console.log(error);
        }
      };

      export const logoutUser = () => async (dispatch) => {
        dispatch(setLoading(true));
        try {
          await axios.post('/api/v1/auth/logout');
          dispatch(logout());
        } catch (error) {
          console.log(error);
        }
      };
