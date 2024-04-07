
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users.js");

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

app.post("/login", async (req,res) => {
    const { username, password} = req.body;
    const user = await UserModel.findOne( { username });

    if (!user) {
        return res.json({ message: "User doesn't exist!"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.json( { message: "Username and password combination are incorrect"});
    }

    const token = jwt.sign( { id: user._id}, "secret");
    res.json({username: username});
    
});

// Get request from front-end as the body inside req and send information to database
app.post("/register", async (req,res) => {

    const { username, password} = req.body;
    const user = await UserModel.findOne( { username });

    if(user) {
        return res.json({message: "User already exists"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel(  {   username, 
                                        password: hashedPassword, 
                                        sex: "", 
                                        age: "",
                                        college: "",
                                        baseball: false,
                                        basketball: false,
                                        cycling: false,
                                        football: false,
                                        golf: false,
                                        tableTennis: false,
                                        tennis: false,
                                        running: false,
                                        soccer: false,
                                        volleyball: false,
                                        first_name: "",
                                        about: "",
                                        url: "",

                                    });
    await newUser.save();

    res.json({message: "User Registered Successfully"});

});

app.post("/editPreferences", async (req,res) => {
    
    const {username, sex, age, college, baseball, basketball, cycling, football, golf, tableTennis, tennis, running, soccer, volleyball} = req.body;
    let user = await UserModel.findOne({username: username});
    if (user) {
        user.sex = sex;
        user.age = age;
        user.college = college;
        user.baseball = baseball;
        user.basketball = basketball;
        user.cycling = cycling;
        user.football = football;
        user.golf = golf;
        user.tableTennis = tableTennis;
        user.tennis = tennis;
        user.running = running;
        user.soccer = soccer;
        user.volleyball = volleyball;
        await user.save();
    }
    
    res.json({message : "Edited"})



})
app.post("/onboarding", async (req,res) => {

    const { username, first_name, age, sex, url, about, college, baseball, basketball, cycling, football, golf, tableTennis, tennis, running, soccer, volleyball} = req.body;
    
    let user = await UserModel.findOne({username: username});
    if (user) {
        user.first_name = first_name;
        user.age = age;
        user.sex = sex;
        user.url = url;
        user.about = about;
        user.college = college;
        user.baseball = baseball;
        user.basketball = basketball;
        user.cycling = cycling;
        user.football = football;
        user.golf = golf;
        user.tableTennis = tableTennis;
        user.tennis = tennis;
        user.running = running;
        user.soccer = soccer;
        user.volleyball = volleyball;
        await user.save()
    }
    res.json({message: "Created Profile"})

});

//Start the server on port 3001 because react automatically uses port 3000
app.listen(3001, () => {
    console.log("SERVER RUNNING");
});

