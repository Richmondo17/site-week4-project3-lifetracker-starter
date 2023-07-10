import React from 'react'
import ExerciseCreatePage from '../ExerciseCreatePage/ExerciseCreatePage'

const ExerciseDetails = ({exercise}) => {
  return (
    <div>
       <h5>ExerciseDetails</h5> 
       <h5>WorkoutName: {exercise.workoutname}</h5> 
       <h5>Category: {exercise.category} </h5> 
       <h5>Duration: {exercise.duration} </h5> 
       <h5>Intensity: {exercise.intensity}</h5> 
    </div>
  )
}

export default ExerciseDetails