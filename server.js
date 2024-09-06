const express = require('express');
const app = express();
const path = require('path');
const {Server} = require('socket.io');

const http = require('http');
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
   socket.on("message", msg => {
       socket.broadcast.emit('message', msg);
   })
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req,res) => {
    return res.sendFile("/public/index.html");
})

server.listen(3000, ()=>{
    console.log("app is strated");
});