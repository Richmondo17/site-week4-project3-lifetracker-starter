const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const pool = require("../db/pool");

router.post("/exerciseData", async (req, res) => {
    const id = req.body;
    const exerciseId = req.params.id;
    try {
      const getExerciseQuery = `
        SELECT *
        FROM exercise
        WHERE id = $1
      `;
      
      const result = await pool.query(getExerciseQuery, [id]);
      const exercise = result.rows;
  
      res.status(200).json(exercise);
      console.log(exercise)
    } catch (error) {
      console.error("Error retrieving exercise:", error);
      res.status(500).json({ message: "Error retrieving exercise" });
    }
  });
  
router.post("/", async (req, res) =>{
    const { workoutName, category, duration, intensity, id} = req.body;
    console.log(workoutName)
    console.log('this is the id:', id)
    try {
        const createUserQuery = `
        INSERT INTO exercise (workoutName, category, duration, intensity, id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `;

        const values = [workoutName, category, Number(duration), Number(intensity), Number(id)];
        
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