import React, { useState } from "react";
import "./RegistrationForm.css";

const RegistrationForm = ({ onRegister }) => {
    
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onRegister(email, username, firstName, lastName, password);
    };

    return (
        <>
          <div className="registration-form-container">
            <h2>CREATE AN ACCOUNT</h2>
            <form onSubmit={handleSubmit}>
              
              <label>Email: </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Username: </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <label>First Name: </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />

              <label>Last Name: </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
    
              <label>Password: </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
    
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </>
      );

}

    
export default RegistrationForm;