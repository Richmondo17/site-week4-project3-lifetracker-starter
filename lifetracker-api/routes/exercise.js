const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const pool = require("../db/pool");


//GET request to retrieve a user by their ID
router.get("/:id", async (req, res) => {
    const id = req.body; // assigning the value of req.body to the variable id
    const userEmail = req.body.email // assigning the value of req.body to the variable userEmail

    // SQL query 
    const findUserIDQuery = `
    SELECT id FROM users
    WHERE email = $1 `;


    /*
    SQL query string findUserIDQuery that selects 
    the id from the users table where the email matches 
    the value provided as a parameter.
    */

    const userIDRes = await pool.query(findUserIDQuery, [userEmail]) //executing the query
    const userID =userIDRes.rows[0]; 



    const exerciseId = req.params.id; // assigning the value of req.params.id to the variable exerciseId

    
    /*
    SQL query string getExerciseQuery 
    that selects all columns from the exercise 
    table where the id matches the value provided as a parameter.
    */

    try {
      const getExerciseQuery = `
        SELECT *
        FROM exercise
        WHERE id = $1
      `;
      
      /*
      Executes the SQL query using pool.query and passes the value of req.params.id as a parameter.
      */
      const result = await pool.query(getExerciseQuery, [req.params.id]);
      const exercise = result.rows;
      res.status(200).json({exercise}); // assigning the rows property of result to the variable exercise.
    } catch (error) {
      console.error("Error retrieving exercise:", error);
      res.status(500).json({ message: "Error retrieving exercise" });
    }
  });


 //POST request to create a new exercise 
router.post("/create", async (req, res) =>{
    const { workoutName, category, duration, intensity, id} = req.body;
    console.log(workoutName)
    console.log('this is the id:', id)
    try {
        const createUserQuery = `
        INSERT INTO exercise (workoutName, category, duration, intensity, id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `;

        //$1 will get workoutName, $2 will get category, $3 will get duration, $4 will get intensity, $5 will be id
        const values = [workoutName, category, Number(duration), Number(intensity), Number(id)]; 
        
        //
        const result = await pool.query(createUserQuery, values);
        
        res.status(201).json({
        message: "Exercise added successfully",
        user: result.rows[0],
        });

    } catch (error) {
        console.error("Error recording exercise: ", error);
        res.status(500).json({ message: "Error recording exercise" });
    }

});

module.exports = router