import React, { useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import Navbar from "../Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css';
import Home from "../Home/Home";
import ExercisePage from '../ExercisePage/ExercisePage';
import ExerciseCreatePage from '../ExerciseCreatePage/ExerciseCreatePage';


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  

  const [loginFormVisible, setLoginFormVisible] = useState(false);
  const [registrationFormVisible, setRegistrationFormVisible] = useState(false);


  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        //Successful Login
        setLoggedIn(true);
        setLoginError("");
        console.log(data.message); //optional - display a success message
      } else {
        //Login failed
        setLoginError(data.message);
        console.log(data.message); //optional - display error message
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };

  //Registration function to handle registration
  const handleRegistration = async (email, username, firstName, lastName, password) => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, firstName, lastName, password }),
      });

      //wait for the response
      const data = await response.json();

      if (response.ok) {
        //Registration successful
        setLoggedIn(true);
        console.log(data.message); //optional - display a success message
      } else {
        //Registration failed
        console.log(data.message); //optional - display error meesage
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // const handleLoginClick = () => {
  //   // Set state to show LoginForm
  //   setLoginFormVisible(true);
  //   setRegistrationFormVisible(false);

  // };

  // const handleRegisterClick = () => {
  //   // Set state to show RegistrationForm
  //   setLoginFormVisible(false);
  //   setRegistrationFormVisible(true);

  // };
  
  const handleLogout = () => {
    setLoggedIn(false);
    <h1>HELLO</h1>
  };

  console.log(handleLogout)

  return (
    <Router>
      <div>
        <Link to="/">Home</Link>
        <Navbar onLogin={handleLogin} error={loginError} loggedIn={loggedIn} onLogout={handleLogout}/>

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={<LoginForm onLogin={handleLogin} error={loginError}/>}
          />

          <Route
            path="/register"
            element={<RegistrationForm onRegister={handleRegistration} />}
          />

          <Route
            path="/logout"
            element={<Home onLogout={handleLogout} />}
          />

          <Route path="/exercise" element={<ExercisePage />} />

          <Route path="/exercise/create" element={<ExerciseCreatePage/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App
