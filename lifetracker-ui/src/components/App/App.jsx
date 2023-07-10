import React, { useEffect, useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import Navbar from "../Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import './App.css';
import Home from "../Home/Home";
import ExercisePage from '../ExercisePage/ExercisePage';
import ExerciseCreatePage from '../ExerciseCreatePage/ExerciseCreatePage';
import jwtDecode from "jwt-decode"
import axios from "axios"
import ActivityPage from "../ActivityPage/ActivityPage";


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [userName, setUserName] = useState();
  const [id, setID] = useState();

console.log("app", id)

console.log(id)
  useEffect(() => {
    const checkLoggedIn = () =>{
      //check if the user is logged in when the user first accesses the webpage
      const token = localStorage.getItem("token");
      if(token){
        //decode the stored token
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.userName);
        setID(decodedToken.userId)

        if(decodedToken.exp * 1000 > Date.now()){
          setLoggedIn(true);
        } else{
          //Token has expired
          handleLogout();
        }
      }
    }
  
    checkLoggedIn();
  }, [])

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("https://lifetracker-api-falo.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        
      });
      console.log(response)

      const data = await response.json();
      console.log("DATA:", data.user)
      console.log("this is the is",data.user.id)
      // console.log("DATA USER:". data.user); 
      setID(data.user.id)
      if (response.status === 200) {

        const {token} = data;
        localStorage.setItem("token", token);

      
        //Successful Login
        setLoggedIn(true);
        setLoginError("");
        console.log(data.message); //optional - display a success message
        console.log(data.user.username) //another way to get username
        
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.userName);
      

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
      const response = await fetch("https://lifetracker-api-falo.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, firstName, lastName, password }),
      });

      //wait for the response
      const data = await response.json();


      if (response.status === 201) {
          //get the token into and store in localStorage
        const {token} = data;
       
        localStorage.setItem("token", token);

        const decodedToken = jwtDecode(token);
        console.log("DECODED IN REG:", decodedToken); 
        setUserName(decodedToken.userName);
        setID(decodedToken.userId); 
        
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
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    Navigate("/");
  };

  console.log(handleLogout)

  return (
    <Router>
      <div>
        {loggedIn &&( 
          <>
        <h1>Welcome {userName}</h1>
        <Link to="/">Home</Link>
        </>
        )}
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
            path="/activity"
            element={<ActivityPage />}/>

          <Route path="/exercise" element={<ExercisePage id={id} />} />

          <Route path="/exercise/create" element={<ExerciseCreatePage  id = {id} />}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App
