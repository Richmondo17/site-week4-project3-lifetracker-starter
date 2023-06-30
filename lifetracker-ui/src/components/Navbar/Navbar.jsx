import React from 'react'
import "./Navbar.css"

const Navbar = () => {
  return (

    <nav className ="navbar">
        <div className=''>
            <ul className="navy">
                <li id="link">
                    <a id ="Activity" href="#activity">Activity</a>
                </li>
                <li id="link">
                    <a id="Exercise" href="#exercise">Exercise</a>
                </li>
                <li id="link">
                    <a id ="Nutrition" href="#nutrition">Nutrition</a>
                </li>
                <li id="link">
                    <a id="Sleep" href="#sleep">Sleep</a>
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar