import React, { useEffect, useState } from "react";
import "./ExerciseCreatePage.css";
import ExerciseDetails from "../ExerciseDetails/ExerciseDetails";
import axios from "axios"; 


/*
ExerciseCreatePage is a form that allows the user to 
record exercise data. The component uses React hooks, 
such as useState and useEffect, to manage the form state and make API requests.
When the form is submitted, the handleSubmit function is called. It sends a POST 
request to the specified API endpoint with the workout name, category, duration, 
intensity, and ID. If the request is successful, the response data is logged to the 
console. If there is an error, the error is logged to the console.
*/

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

/*
Takes in five parameters: workoutName, category, duration, intensity, and id.
Inside the function, it logs the id parameter to the console. Then, it makes a POST request 
to the URL "https://lifetracker-api-falo.onrender.com/exercise/create" with a JSON payload containing the parameters.
If the response is successful (status code 200), it logs a success message with the returned data. 
Otherwise, it logs an error message with the error data.
If any error occurs during the execution of the function, it logs the error and also logs the value of user.i
*/

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


/*
The useEffect hook is used to fetch exercise data 
from the API when the component mounts. It sends a GET 
request to the specified API endpoint with the ID. The response 
data is then used to update the exerciseData state.
*/

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

    /*
    When the form is submitted, it calls the handleSubmit function. 
    The form includes input fields for workoutName, category, duration, and intensity,
    with corresponding value attributes and onChange event handlers that update the 
    state variables workoutName, category, duration, and intensity respectively
    */
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

/*
checks if exerciseData is not null and has a length greater than 0. 
If so, it maps over exerciseData and renders an ExerciseDetails component for 
each exercise. Otherwise, it displays a loading message
*/

  );
};

export default ExerciseCreatePage;
