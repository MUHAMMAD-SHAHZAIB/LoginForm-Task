// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import ApiClient from "../ulits/api";
import "./Form.css";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    api: "",
  });

  //  --------Email validation------------
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //------------email and password handling-----------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  //---------------form validation--------------------
  const validateForm = () => {
    let valid = true;

    //----email valid
    if (!email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter your email",
      }));
      valid = false;
    } else if (!validateEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email",
      }));
      valid = false;
    }

    //---password valid
    if (password.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 8 characters long",
      }));
      valid = false;
    }

    return valid;
  };

  //----from handle submit---------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    //---------Api logic------------
    ApiClient.login(email, password)
      .then((response) => {
        if (response.data.email !== "existingUser") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            api: "Invalid email or password",
          }));
        } else {
          // Handle successful login
          console.log("Sucessfully logged in");
        }
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          api: "Error occurred during API call",
        }));
      });
  };

  return (
    //-----Login Form--------
    <form className="login-form" onSubmit={handleSubmit} id="main">
      <h2>Login to your account</h2>

      {/* ------email input------ */}
      <div className="input-parent">
        <label>Email:</label>
        <input
          className={errors.email ? "error-input" : ""}
          type="text"
          name="email"
          value={email}
          onChange={handleInputChange}
          id="username"
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>

      {/* --------passsword input--------- */}
      <div className="input-parent">
        <label>Password:</label>
        <input
          className={errors.password ? "error-input" : ""}
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          id="password"
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
      </div>

      {/* --------button-------- */}
      <button type="submit">Submit</button>
      {errors.api && <p className="error-message">{errors.api}</p>}
    </form>
  );
};

export default Form;
