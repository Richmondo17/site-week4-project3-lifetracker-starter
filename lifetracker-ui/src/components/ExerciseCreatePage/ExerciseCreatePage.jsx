import React, { useEffect, useState } from "react";
import "./ExerciseCreatePage.css";
import ExerciseDetails from "../ExerciseDetails/ExerciseDetails";
import axios from "axios"; 

const ExerciseCreatePage = ({id}) => {
  const [workoutName, setWorkoutName] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState("");

  const [exerciseData, setExerciseData] = useState([]);

  console.log('id is', id)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleExercise(workoutName, category, duration, intensity, id);
      setExerciseData()
      // Handle successful submission or any additional logic
    } catch (error) {
      // Handle error case if needed
      console.error("Error:", error);
    }
  };

  const handleExercise = async (workoutName, category, duration, intensity, id) => {
    console.log(id)
    try {
      const response = await fetch("https://lifetracker-api-falo.onrender.com/exercise/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ workoutName, category, duration, intensity, id}),
      });
      

      const data = await response.json();

      if (response.ok) {
        console.log("Exercise added successfully:", data);
        // Add any additional logic or state updates as needed
      } else {
        console.error("Failed to add exercise:", data.message);
        // Handle error case if needed
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error case if needed
      console.log("user id", user.id)
    }
  };

  useEffect(() => {
        axios.get(`https://lifetracker-api-falo.onrender.com/exercise/${id}`)
        .then((response) => {
           console.log("RES DATA:", response)
          setExerciseData(response.data.exercise)
          console.log("EXERDATA:", exerciseData); 
        })
        .catch((error) => {
          console.log("error:", error)
        })
  }, []);

  return (
    <>
    <form onSubmit={handleSubmit}>
      <h3>Record Exercise</h3>
      <label>Workout Name: </label>
      <input
        type="text"
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
        required
      />

      <label>Category: </label>
      <select
        className="custom-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select a category</option>
        <option value="Run">Run</option>
        <option value="Bike">Bike</option>
        <option value="Lift">Lift</option>
        <option value="Swim">Swim</option>
        <option value="Sports">Sports</option>
      </select>

      <p></p>

      <label>Duration (minutes): </label>
      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        required
      />

      <label>Intensity: </label>
      <input
        type="number"
        value={intensity}
        onChange={(e) => setIntensity(e.target.value)}
        required
      />
      <button type="submit">Save</button>
    </form>ˇ

    {exerciseData && exerciseData.length > 0 ? (
  exerciseData.map((exercise, index) => (
    <ExerciseDetails exercise={exercise} key={index} />
  ))
) : (
  <p>Loading exercise data...</p>
)}

    </>

  );
};

export default ExerciseCreatePage;
