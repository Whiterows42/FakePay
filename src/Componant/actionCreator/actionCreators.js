import axios from "axios";
import { showSnackbar } from "../../features/CreateSlice";

const domainUrl = "https://server-taupe-seven-11.vercel.app";

export const LoginApi = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(domainUrl + "/api/auth/login", {
      email,
      password,
    });
    dispatch(showSnackbar(response.data.message));
    return response;
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Login failed. Please try again.";
    console.log(err);
    dispatch(showSnackbar(errorMessage));
    return null;
  }
};

export const CheckUserApi = (email) => async (dispatch) => {
  try {
    const response = await axios.post(domainUrl + "/api/auth/check-user", {
      email,
    });
    dispatch(showSnackbar(response.data.message));
    return response;
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Check user failed. Please try again.";
    console.log(err);
    dispatch(showSnackbar(errorMessage));
    return null;
  }
};

export const RegisterUserApi =
  (email, password, username, firstName, lastName) => async (dispatch) => {
    try {
      const response = await axios.post(domainUrl + "/api/auth/register", {
        email,
        password,
        username,
        firstName,
        lastName,
      });
      dispatch(showSnackbar(response.data.message));
      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Registration failed. Please try again.";
      console.log(err);
      dispatch(showSnackbar(errorMessage));
      return null;
    }
  };

export const VerifyOtpApi = (email, otp) => async (dispatch) => {
  try {
    const response = await axios.post(domainUrl + "/api/auth/verify-otp", {
      email,
      otp,
    });
    dispatch(showSnackbar(response.data.message));
    return response;
  } catch (err) {
    const errorMessage =
      err.response?.data?.message ||
      "OTP verification failed. Please try again.";
    console.log(err);
    dispatch(showSnackbar(errorMessage));
    return null;
  }
};

export const getUserDetails = async (email) => {
  try {
    const response = await axios.post(domainUrl + "/api/auth/userdetails", {
      email,
    });

    return response.data; // Return the user details from the response
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null; // Return null or handle the error appropriately
  }
};
