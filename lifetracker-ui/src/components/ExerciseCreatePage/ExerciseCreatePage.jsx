import React, { useEffect, useState } from "react";
import "./ExerciseCreatePage.css";
import ExerciseDetails from "../ExerciseDetails/ExerciseDetails";

const ExerciseCreatePage = ({id}) => {
  const [workoutName, setWorkoutName] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState("");

  const [exerciseData, setExerciseData] = useState(null);

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
      const response = await fetch("http://localhost:3001/exercise/create", {
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
      console.log(user.id)
    }
  };

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        console.log("this is the id", id)
        const response = await fetch(`http://localhost:3001/exercise/${id}`);
        const data = await response.json();
        setExerciseData(data);
      } catch (error) {
        console.error("Error retrieving exercise:", error);
      }
    };

    fetchExercise();
  }, [exerciseData]);

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
    </form>

    {exerciseData ? (
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
