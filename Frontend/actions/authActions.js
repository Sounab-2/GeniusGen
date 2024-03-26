import { setLoading, setUser, logout } from '../features/userSlice';
import { axiosInstance } from '../utils/index';

export const register = (userData, navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axiosInstance.post('/api/v1/auth/register', userData);
    dispatch(setUser(response.data.user));
    navigate('/signin');
  } catch (error) {
    console.log(error.response.data.msg);
  } finally {
    dispatch(setLoading(false)); // Set loading to false after operation completes
  }
};

export const login = (userData, navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axiosInstance.post('/api/v1/auth/login', userData);
    dispatch(setUser(response.data.user));
    navigate('/product');
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setLoading(false)); // Set loading to false after operation completes
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await axiosInstance.get('/api/v1/auth/logout');
    dispatch(logout());
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setLoading(false)); // Set loading to false after operation completes
  }
};
