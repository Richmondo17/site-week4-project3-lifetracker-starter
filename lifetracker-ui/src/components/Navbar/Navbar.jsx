import React from 'react'
import "./Navbar.css"
import {Link} from 'react-router-dom';

const Navbar = ({onLogin, onRegisterClick, loggedIn, onLogout }) => {
  return (
    <nav className="navbar">
      <ul className="navy">
        <li id="link">
          <Link to="/activity">Activity</Link>
        </li>
        <li id="link">
          <Link to="/exercise">Exercise</Link>
        </li>
        <li id="link">
          <Link to="/nutrition">Nutrition</Link>
        </li>
        <li id="link">
          <Link to="/sleep">Sleep</Link>
        </li>
      </ul>

      <div className="buttons">
        {loggedIn ? (
          <Link to="/">
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
          </Link>
        ) : (
          <div>
            <Link to="/login">
              <button className="login-button">Login</button>
            </Link>

            <Link to="/register">
              <button className="register-button">Register</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar