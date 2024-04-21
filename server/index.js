
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const UserModel = require("./models/Users.js");
const messageModel = require("./models/message.js");
//const chatModel = require("./models/chats.js");
const cors = require("cors");
const chatModel = require("./models/chat.js");

//Allow the json body to be read as an object
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Connect to cloud database "Drivers" =>add password and name of database on Compass
mongoose.connect("mongodb+srv://courts:CEN_TEAM_27@cluster0.l3pyct1.mongodb.net/Courts?retryWrites=true&w=majority&appName=Cluster0");

app.post("/addMatch", async(req,res)=> {
    const {username, matchUsername} = req.body;
    try {
        let user = await UserModel.findOne({username: username});
        if (!user.matches.includes(matchUsername)) {
          
            user.matches.push(String(matchUsername));
        await user.save();
        }
        res.json("sent")
    } catch (err) {
        res.json(err)
    }
})

//Make request to get user data from database, wait for the response before trying to send the json data, using async and await

app.get("/card/:id", async(req,res) => {
    try {
        const {id} = req.params;

        const user = await UserModel.findOne({username: id});
        res.json(user)
    } catch (err) {
        res.json(err)
    }
})

app.post("/getUser", async (req,res) => {
    const {username} = req.body;
    
    
    try {
        const user = await UserModel.findOne( {username: username});
        
        if (!user) {
            return res.json({ message: "User doesn't exist!"});
        }
        
        res.json(user)
    } catch (err) {
        res.json(err)
    }
});

//Req should be username, and all sports preferences
//Response will be a list of all usernames 
app.post("/getUsersSimilar", async (req,res) => {

    const users = [];
    const {username: _username} = req.body;
    
    const user = await UserModel.findOne({username: _username});
    
    const {username, football, basketball, tennis, baseball, cycling, golf, tableTennis, running, soccer, volleyball } = user;


    try {
        if (football) {
            const data = await UserModel.find({football});
            for (i in data) {
                if (!(users.includes(data[i].username)) && data[i].username != String(username) && (!user.matches.includes(data[i].username))) {
                    users.push(data[i].username)
                }
            }
        }
        if (basketball) {
            const data = await UserModel.find({basketball});
            for (i in data) {
                if (!(users.includes(data[i].username)) && data[i].username != String(username)&& (!user.matches.includes(data[i].username))) {
                    users.push(data[i].username)
                }
            }
        }
        if (tennis) {
            const data = await UserModel.find({tennis});
            for (i in data) {
                if (!(users.includes(data[i].username)) && data[i].username != String(username)&& (!user.matches.includes(data[i].username))) {
                    users.push(data[i].username)
                }
            }
        }
        if (baseball) {
            const data = await UserModel.find({baseball});
            for (i in data) {
                if (!(users.includes(data[i].username)) && data[i].username != String(username)&& (!user.matches.includes(data[i].username))) {
                    users.push(data[i].username)
                }
            }
        }
        if (cycling) {
            const data = await UserModel.find({cycling});
            for (i in data) {
                if (!(users.includes(data[i].username)) && data[i].username != String(username)&& (!user.matches.includes(data[i].username))) {
                    users.push(data[i].username)
                }
            }
        }
        if (golf) {
            const data = await UserModel.find({golf});
            for (i in data) {
                if (!(users.includes(data[i].username)) && data[i].username != String(username)&& (!user.matches.includes(data[i].username))) {
                    users.push(data[i].username)
                }
            }
        }
        if (tableTennis) {
            const data = await UserModel.find({tableTennis});
            for (i in data) {
                if (!(users.includes(data[i].username)) && data[i].username != String(username)&& (!user.matches.includes(data[i].username))) {
                    users.push(data[i].username)
                }
            }
        }
        if (running) {
            const data = await UserModel.find({running});
            for (i in data) {
                if (!(users.includes(data[i].username)) && data[i].username != String(username)&& (!user.matches.includes(data[i].username))) {
                    users.push(data[i].username)
                }
            }
        }
        if (soccer) {
            const data = await UserModel.find({soccer});
            for (i in data) {
                if (!(users.includes(data[i].username)) && data[i].username != String(username)&& (!user.matches.includes(data[i].username))) {
                    users.push(data[i].username)
                }
            }
        }
        if (volleyball) {
            const data = await UserModel.find({volleyball});
            for (i in data) {
                if (!(users.includes(data[i].username)) && data[i].username != String(username)&& (!user.matches.includes(data[i].username))) {
                    users.push(data[i].username)
                }
            }
        }
        
        res.json(users);
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
                                        register: []

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

app.post("/chats", async (req,res) => {
    try {
        const { message, username, contact} = req.body;

        //find users based on usernames provided
        let sender = await UserModel.findOne({username: username});
        let reciever = await UserModel.findOne({username : contact});

        //check if sender and recievers are properly located
        if (!sender) {
            return res.status(404).json({ error: "Sender not found" });
        }

        if (!reciever) {
            return res.status(404).json({ error: "Reciever not found" });
        }
        
        //look for preexisting conversation index in mongo
        let conversation = await chatModel.findOne({
            participants: { $all: [sender._id, reciever._id] }
        });

        //create new convo if it doesn't exist
        if(!conversation){
            conversation = await chatModel.create({
                participants: [sender._id, reciever._id]
            });
        }
        
        //create the message index
        const newMessage = new messageModel({
            senderId: sender._id,
            recieverId: reciever._id,
            message: message,
        });

        if(newMessage){
            conversation.messages.push(newMessage._id);
        };

        //socket io functionality here

        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in send message: ", error.message);
        res.setMaxListeners(500).json({ error: "Internal Server Error"});
    }
});

app.get("/chats/:id", async (req, res) => {
    try {
        const { username, contact} = req.query;

        console.log(username);
        console.log(contact);

        //find users based on usernames provided
        let sender = await UserModel.findOne({username : username});
        let reciever = await UserModel.findOne({username : contact});

        const conversation = await chatModel.findOne({
            participants: { $all: [sender._id, reciever._id] }
        }).populate("messages");

        let array = [];

        if (conversation) {
            conversation.messages.forEach(message => {
                console.log("Message:", message.message); // Assuming message content is stored in 'message' field
            });
            array = conversation.messages;
        } else {
            console.log("Conversation not found.");
            
        }

        res.status(200).json(array);
    } catch (error) {
        console.log("Error in GetMessages: ", error.message);
        res.status(500).json({ error : "Internal server error"});
    }
})

app.get("/chats", async (req, res) => {
    try {
        console.log("getting users");
        const { username } = req.query;
        const user = await UserModel.findOne({ username : username });
        const matches = await UserModel.find({ _id: { $ne: user } }).select("-password");
        if (matches) {
            matches.forEach(participants => {
                console.log("User:", participants.username); // Assuming message content is stored in 'message' field
            });
        } else {
            console.log("Conversation not found.");
        }
        console.log("returning users");
        res.status(200).json(matches);
    } catch (error) {
        console.error("Error in getMatches: ", error.message);
        res.status(500).json({ error: "Internal server error"});
    }
})

//Start the server on port 3001 because react automatically uses port 3000
app.listen(3001, () => {
    console.log("SERVER RUNNING");
});

