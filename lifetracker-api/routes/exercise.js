const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const pool = require("../db/pool");

router.post("/", async (req, res) =>{
    const { workoutName, category, duration, intensity} = req.body;

    try {
        const createUserQuery = `
        INSERT INTO exercise (workoutName, category, duration, intensity)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `;

        const values = [workoutName, category, duration, intensity];
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