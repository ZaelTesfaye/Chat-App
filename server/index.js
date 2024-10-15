require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const userRoutes = require("./routers/userRouters");
const messageRoutes = require("./routers/messagesRoute");
const socket = require("socket.io")
const cookieParser = require("cookie-parser")
require('./config/auth');
const passport = require("passport")
const session = require("express-session")

const app = express();

app.use(session({secret: "cats", saveUninitialized:false, resave: false}))
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB connected successfully"))
    .catch((error) => console.error(error.message))

const corsOptions = {
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://accounts.google.com"
    ],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started at ${process.env.PORT}`);
})

const io = socket(server, {
    cors: corsOptions
});

onlineUsers = new Map();

io.on("connection", (socket) => {
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-receive", data.msg);
        }
    });
});




