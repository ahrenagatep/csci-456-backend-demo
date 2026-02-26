// app entry point

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./config/database");

// middleware
app.use(cors());
app.use(express.json());

// route setting!!!

// create a user
app.post("/users", async(req, res) => {
    try {
        const { name, email } = req.body;
        
        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required" });
        }
        
        // SQL query for inserting a new user
        const newUser = await pool.query("INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
            [name, email]
        );


        res.json(newUser.rows[0]);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
});

// get all users
app.get("/users", async(req, res) => {
    try {

        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows)

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
});

// get a user
app.get("/users/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [id])

        res.json(user.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
});

// update a user
app.put("/users/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required" });
        }
        
        const updateUser = await pool.query("UPDATE users SET name = $1, email = $2 WHERE user_id = $3 RETURNING *",
            [name, email, id]
        )

        res.json("User was updated!");
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
});

// delete a user
app.delete("/users/:id", async(req, res) => {
    try {
        const { id } = req.params;
        
        const deleteUser = await pool.query("DELETE FROM users WHERE user_id = $1",
            [id]
        );

        res.json("User was deleted!");
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
});

app.listen(5000, () => {
    console.log("Server started on port 5000!")
});