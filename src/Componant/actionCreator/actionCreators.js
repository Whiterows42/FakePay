import axios from "axios";
import Cookies from "js-cookie";
const domainUrl = "https://server-taupe-seven-11.vercel.app";

export const LoginApi = async (email, password) => {
  try {
    const response = await axios.post(domainUrl + "/api/auth/login", {
      email,
      password,
    });
    console.log("tsss",response);
    return response; // Return the response so it can be used in the component
  } catch (err) {
    console.log(err);
    return null; // Return null or handle the error appropriately
  }
};

export const CheckUserApi = async (email) => {
  try {
    const response = await axios.post(domainUrl + "/api/check-user", {
      email,
    });
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const RegisterUserApi = async (
  email,
  password,
  username,
  firstName,
  lastName
) => {
  try {
    const response = await axios.post(domainUrl + "/api/auth/register", {
      email,
      password,
      username,
      firstName,
      lastName,
    });
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const VerifyOtpApi = async (email, otp) => {
  try {
    const response = await axios.post(domainUrl + "/api/auth/verify-otp", {
      email,
      otp,
    });
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
};
export const fetchUserData = async () => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.get("/api/auth/userData", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request data:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error message:", error.message);
    }
    throw error;
  }
};