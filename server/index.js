const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");

const cors = require("cors");

//Allow the json body to be read as an object
app.use(express.json());
app.use(cors());

//Connect to cloud database "Drivers" =>add password and name of database on Compass
mongoose.connect("mongodb+srv://courts:CEN_TEAM_27@cluster0.l3pyct1.mongodb.net/Courts?retryWrites=true&w=majority&appName=Cluster0");

//Make request to get user data from database, wait for the response before trying to send the json data, using async and await
app.get("/getUsers", async (req,res) => {
    try {
        const data = await UserModel.find({});
        res.json(data);
    } catch (err) {
        res.json(err);
    }
});

// Get request from front-end as the body inside req and send information to database
app.post("/createUser", async (req,res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();

    res.json(user);
});




//Start the server on port 3001 because react automatically uses port 3000
app.listen(3001, () => {
    console.log("SERVER RUNNING");
});

