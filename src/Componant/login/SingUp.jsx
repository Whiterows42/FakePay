import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { CircularProgress } from "@mui/material";
import {
  Box,
  IconButton,
  InputAdornment,
  Slide,
  Snackbar,
  TextField,
} from "@mui/material";
import { FaLock, FaUser } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CheckUserApi, RegisterUserApi } from "../actionCreator/actionCreators";
import { useDispatch , useSelector } from "react-redux";
import { getUserCredentialMessage, hideSnackbar, setLoading } from "../../features/CreateSlice";


const Signup = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const snackbar = useSelector((state) => state.data.snakmessage);
  const dispatch = useDispatch();

  // 
  
  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .trim()
      .min(2)
      .matches(/^[A-Za-z ]*$/, "special character not allowed")
      .required("Required"),
    lastName: Yup.string()
      .trim()
      .min(2)
      .matches(/^[A-Za-z ]*$/, "special character not allowed")
      .required("Required"),
    username: Yup.string().required("Required"),
    email: Yup.string()
      .email("Invalid email format")
      // .matches(
      //   /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/,
      //   "invalid Gmail"
      // )
      .required("Required"),
    password: Yup.string()
      .trim()
      .min(6)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[a-zA-Z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{6,}$/,
        "Enter Strong number"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const onSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      // Check if user already exists
      const checkUserResponse = await dispatch(CheckUserApi(values.email));
      if (checkUserResponse && checkUserResponse.data.success) {
        setFieldError("email", "This email is already taken");
        setMessage("This email is already taken");
        setOpen(true);
      } else {
        // Register the user
        const registerResponse = await dispatch( RegisterUserApi(
          values.email,
          values.password,
          values.username,
          values.firstName,
          values.lastName
        ));
        if (registerResponse && registerResponse.data.success) {
          setMessage("Signup successful!");
          localStorage.setItem("token", registerResponse.data.token);
          dispatch(getUserCredentialMessage(registerResponse.data));
          setOpen(true);
          navigate("/");
        } else {
          setMessage(registerResponse.data.message || "An error occurred");
          setOpen(true);
        }
      }
    } catch (error) {
      setFieldError("email", error.message || "An error occurred");
      setMessage("An error occurred during signup");
      setOpen(true);
    } finally {
      dispatch(setLoading(false))
      setSubmitting(false);
    
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCloseSnackbar = () => {
    dispatch(hideSnackbar());
  };

 const renderTextField = (
   name,
   label,
   type,
   icon,
   showPassword,
   handleClickShowPassword
 ) => (
   <Field name={name}>
     {({ field, meta }) => (
       <TextField
         {...field}
         className="rounded-sm"
         id={name}
         type={type}
         label={label}
         placeholder={`Enter ${label}`}
         variant="outlined"
         required
         error={meta.touched && Boolean(meta.error)}
         helperText={meta.touched && meta.error}
         InputProps={{
           startAdornment: (
             <InputAdornment position="start">{icon}</InputAdornment>
           ),
           ...(name === "password" && {
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
           }),
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
 );



  return (
    <div className="bg-black h-[100vh] flex justify-center flex-col items-center w-full relative">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="flex justify-center flex-col gap-3 border p-10 rounded-lg border-white md:w-1/2">
            {isSubmitting && (
              <div className="flex justify-center  w-full">
                <div class="text-center text-white">
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            )}
            {!isSubmitting && (
              <div className="text-white gap-4 flex flex-col">
                <div className="flex mb-3 justify-center text-xl font-bold">
                  <h1 className="tracking-wider">User Signup</h1>
                </div>
                <div className="row">
                  <div className="col-sm-12 mb-2 col-md-6">
                    {renderTextField(
                      "firstName",
                      "First Name",
                      "text",
                      <FaUser style={{ color: "white" }} />
                    )}
                  </div>

                  <div className="col-sm-12 mt-2 col-md-6">
                    {renderTextField(
                      "lastName",
                      "Last Name",
                      "text",
                      <FaUser style={{ color: "white" }} />
                    )}
                  </div>
                </div>

                {renderTextField(
                  "username",
                  "Username",
                  "text",
                  <FaUser style={{ color: "white" }} />
                )}
                {renderTextField(
                  "email",
                  "Email",
                  "email",
                  <MdMarkEmailRead style={{ color: "white" }} />
                )}

                <div className="row">
                  <div className="col-sm-12 mb-2 col-md-6">
                    {renderTextField(
                      "password",
                      "Password",
                      showPassword ? "text" : "password",
                      <FaLock style={{ color: "white" }} />,
                      showPassword,
                      handleClickShowPassword
                    )}
                  </div>
                  <div className="col-sm-12 mt-2 col-md-6">
                    {renderTextField(
                      "confirmPassword",
                      "Confirm Password",
                      showConfirmPassword ? "text" : "password",
                      <FaLock style={{ color: "white" }} />
                    )}
                  </div>
                </div>
                <div></div>
              </div>
            )}
            {!isSubmitting && (
              <button
                className="w-full bg-white font-bold p-2 rounded"
                type="submit"
                disabled={isSubmitting && !isValid}
              >
                Signup
              </button>
            )}
          </Form>
        )}
      </Formik>

      <div className="flex mt-3 justify-center items-center gap-3">
        <h1 className="text-white ">AllReady have account ?</h1>
        <button onClick={() => navigate("/")}>login</button>
      </div>
      <Box sx={{ width: 500, position: "absolute" }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackbar.open}
          message={snackbar.message}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        />
      </Box>
    </div>
  );
};

export default Signup;
