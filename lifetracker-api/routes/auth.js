const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

//registration route
router.post("/register", async (req, res) =>{
const { email, username, firstName, lastName, password } = req.body

    try {
        //take the users email, username, firstname, lastname, password, and confrmed password
        //and creates a new user in our database

        //Generate salt with cost factor
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        //hash the password using the generated salt
        const hashedPassword = await bcrypt.hash(password, salt);

        const createUserQuery = `
            INSERT INTO users (email, username, firstName, lastName, password)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            `;

        //$1 will get email, $2 will get username, $3 firstName, $4 lastname, $5 will be hashedPassword
        const values = [email, username, firstName, lastName, hashedPassword];
        const result = await pool.query(createUserQuery, values);

        } catch (error) {
        //if all this works and no error - Status code 201 - successful entry
            res.status(201).json({
            message: "User registered successfully",
            user: result.rows[0],
            });
        }
    });


//login route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    try {
        //take user email and password and attempt to authenticate them, checks if it exists in the DB
        const getUserQuery = `
        SELECT * FROM users
        WHERE email = $1
    `;
        //execute the query
        const result = await pool.query(getUserQuery, [email]);
        //store the user data returned from the query
        const user = result.rows[0];

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
          }
      
          //check if the password entered is correct
          //user.password is the password which is stored in the DB
          //password is the user input
          const isPasswordValid = await bcrypt.compare(password, user.password);
      
          if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
          }

        //Generate and sign JWT token, store secret-key in .env
        const token = jwt.sign({ userId: user.id }, "secret-key-unique", {
        expiresIn: "1h",
      });

            res.status(200).json({
            message: "Login Successful",
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            });
      

    } catch (error){
        console.error("Error logging in: ", error);
        res.status(500).json({ message: "Error Logging in" });
    }
})

module.exports = router