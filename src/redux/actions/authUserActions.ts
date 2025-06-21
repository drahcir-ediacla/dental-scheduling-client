import { axiosInstance } from "../../lib/axiosInstance";
import { setAuthUser, setLoading, setError } from "../reducer/authUserSlice";
import type { AppDispatch } from "../store";

export const authUser = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axiosInstance.get('/api/get/user/auth');
    dispatch(setAuthUser(response.data));
  } catch (error) {
    console.error("Error fetching authenticated user:", error);
    dispatch(setError('Error fetching authenticated user.'));
  } finally {
    dispatch(setLoading(false));
  }
};
