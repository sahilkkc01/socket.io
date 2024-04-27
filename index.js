
//using http module to attach socket.io to express
const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new Server(server);
//io will handle sockets

//socket.io handle
//every user is socket and (socket) will contain user information
//jaise hi hum connection krenge ek socket aaega
io.on("connection",(socket)=>{
    socket.on("user-message",(message)=>{
        io.emit("message",message);
    });
})

app.use(express.static(path.resolve("./public")));
//setting up middleware to access files in public folder by client

app.get('/',(req,res)=>{
    res.sendFile('./public/index.html');
})

const HOST = '0.0.0.0'; // Listen on all network interfaces

server.listen(9000,HOST,()=>{
    console.log("server is running on port 9000")
})
