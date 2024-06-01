import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  LoginApi,
  VerifyOtpApi,
  fetchUserData,
} from "../actionCreator/actionCreators";
import { getFetchUserData } from "../../features/CreateSlice";
import {
  Box,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  CircularProgress,
} from "@mui/material";
import { FaLock } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import OtpInput from "./OtpInput";
import Cookies from "js-cookie";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetOtp, setResetOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [otpError, setOtpError] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const verifyToken = async () => {
        try {
          const userData = await fetchUserData();
          dispatch(getFetchUserData(userData));
          navigate("/home");
        } catch (error) {
          console.error("Token verification failed:", error);
        }
      };
      verifyToken();
    } else {
      navigate("/");
    }
  }, [navigate, dispatch]);

  useEffect(() => {
    let countdown;
    if (otpSent && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [otpSent, timer]);

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  const initialValues = {
    email: "",
    password: "",
    otp: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    otp: Yup.string().when("otpSent", {
      is: true,
      then: Yup.string().required("Required"),
    }),
  });

  const onSubmit = (values, { setSubmitting, setFieldError }) => {
    setLoading(true);
    if (!otpSent) {
      LoginApi(values.email, values.password)
        .then((response) => {
          setMessage(response.data.message);
          if (response.status === 200) {
            setOpen(true);
            setOtpSent(true);
            setEmail(values.email);
            setPassword(values.password);
            setTimer(60);
          } else {
            setFieldError(
              "email",
              response.data.message || "An error occurred"
            );
            setMessage(response.data.message || "Something went wrong");
            setOpen(true);
          }
        })
        .catch((error) => {
          console.log("Error response:", error.response);
          setFieldError(
            "email",
            error.response?.data?.message || "An error occurred"
          );
          setMessage(error.response?.data?.message || error.message);
          setOpen(true);
        })
        .finally(() => {
          setSubmitting(false);
          setLoading(false);
        });
    } else {
      VerifyOtpApi(email, values.otp)
        .then((response) => {
          console.log("Success response:", response);
          setMessage(response.data.message);
          if (response.status === 200) {
            setOpen(true);
            Cookies.set("token", response.data.token, { expires: 1 });
            navigate("/home");
            return fetchUserData();
          } else {
            setOtpError(true);
            setFieldError("otp", response.data.message || "Invalid OTP");
            setMessage(response.data.message);
            setOpen(true);
          }
        })
        .then((userData) => {
          if (userData) {
            dispatch(getFetchUserData(userData));
          }
        })
        .catch((error) => {
          console.log("Error response:", error.response);
          setOtpError(true);
          setFieldError(
            "otp",
            error.response?.data?.message || "An error occurred"
          );
          setMessage(error.response?.data?.message || error.message);
          setOpen(true);
        })
        .finally(() => {
          setSubmitting(false);
          setLoading(false);
        });
    }
  };

  const resendOtp = async (resetForm) => {
    setResendLoading(true);
    if (email && password) {
      try {
        const response = await LoginApi(email, password);
        if (response && response.status === 200) {
          setMessage("OTP resent successfully");
          setOpen(true);
          resetForm();
          setResetOtp(true);
          setTimeout(() => setResetOtp(false), 100); // Reset the OTP component
          setTimer(60); // Reset the timer to 2 minutes
        } else {
          setMessage(response.data.message || "Failed to resend OTP");
          setOpen(true);
        }
      } catch (error) {
        setMessage(error.message || "An error occurred");
        setOpen(true);
      } finally {
        setResendLoading(false);
      }
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleOtpSubmit = (otp) => {
    onSubmit(
      { otp },
      {
        setFieldError: (field, message) => {},
        setSubmitting: (isSubmitting) => {},
      }
    );
  };

  return (
    <div className="bg-black h-[100vh] flex justify-center flex-col items-center w-full relative">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, isValid, resetForm, errors, touched }) => (
          <Form className="flex justify-center flex-col gap-3 border p-10 rounded-lg border-white md:w-1/2">
            <div className="text-white">
              <div className="flex mb-3 justify-center text-xl font-bold">
                <h1 className="tracking-wider">
                  {otpSent ? "Enter OTP" : "User Login"}
                </h1>
              </div>
              {!otpSent && (
                <>
                  <Field name="email">
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        className="rounded-sm"
                        id="outlined-basic"
                        type="email"
                        label="Email"
                        placeholder="Enter Email"
                        variant="outlined"
                        required
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && errors.email}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MdMarkEmailRead style={{ color: "white" }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "white",
                            },
                            "&:hover fieldset": {
                              borderColor: "white",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "white",
                            },
                            color: "white",
                          },
                          "& .MuiInputBase-input": {
                            color: "white",
                          },
                          "& .MuiInputLabel-root": {
                            color: "white",
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "white",
                          },
                        }}
                        fullWidth
                      />
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        className="rounded-sm mt-3"
                        id="outlined-basic"
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        placeholder="Enter Password"
                        variant="outlined"
                        required
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FaLock style={{ color: "white" }} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff style={{ color: "white" }} />
                                ) : (
                                  <Visibility style={{ color: "white" }} />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "white",
                            },
                            "&:hover fieldset": {
                              borderColor: "white",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "white",
                            },
                            color: "white",
                          },
                          "& .MuiInputBase-input": {
                            color: "white",
                          },
                          "& .MuiInputLabel-root": {
                            color: "white",
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "white",
                          },
                        }}
                        fullWidth
                      />
                    )}
                  </Field>
                </>
              )}
              {otpSent && (
                <Field name="otp">
                  {({ field, form }) => (
                    <OtpInput
                      {...field}
                      error={errors.otp}
                      touched={touched.otp}
                      helperText={touched && errors.otp ? errors.otp : ""}
                      resetOtp={resetOtp}
                      onOtpSubmit={(otp) => {
                        form.setFieldValue("otp", otp, true);
                        handleOtpSubmit(otp);
                      }}
                    />
                  )}
                </Field>
              )}
            </div>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                marginTop: 2,
              }}
            >
              {loading ? (
                <button className=" bg-white text-black py-2 px-4 rounded">
                  <CircularProgress size={24} color="inherit" />
                </button>
              ) : (
                <button
                  type="submit"
                  className=" bg-white text-black py-2 px-4 rounded"
                  disabled={isSubmitting || !isValid}
                >
                  {otpSent ? "Verify OTP" : "Login"}
                </button>
              )}
              {otpSent && (
                <button
                  type="button"
                  className="bg-blue-500 text-white py-2 px-4 rounded ml-4"
                  onClick={() => resendOtp(resetForm)}
                  disabled={resendLoading || timer > 0}
                >
                  {resendLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    `Resend OTP ${timer > 0 ? `(${timer}s)` : ""}`
                  )}
                </button>
              )}
            </Box>
          </Form>
        )}
      </Formik>
      <div className="flex mt-4 justify-center items-center gap-2">
        <h1 className="text-white">Don't have an account?</h1>
        <button onClick={() => navigate("/signup")}>REGISTER HERE</button>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={message ? message : "Something went wrong"}
      />
    </div>
  );
};

export default Login;
