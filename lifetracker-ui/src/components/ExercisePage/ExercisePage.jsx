import React, { useState } from "react";
import "./ExercisePage.css";
import {Link} from 'react-router-dom';

const ExercisePage = () =>{

  const [addExercise, setAddExercise] = useState(false);

  const handleAddExercise = () => {
    setAddExercise(true);
  }

  return (
    <>
      <div className="exercise-page-container">
        <div className="banner">
          <h1>EXERCISE</h1>

          <img src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" width="500" alt="Image 1"  />

        </div>

        <Link to="/exercise/create">
          <button className="addExerciseBtn" onClick={handleAddExercise}>
            Add Exercise
          </button>
        </Link>

        </div>
    </>
  );
};

export default ExercisePage;