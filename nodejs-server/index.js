const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io")
const cors = require("cors");
var mqtt = require('mqtt');


// connection to raspberry
const topic = "testTopic";
var client = mqtt.connect("mqtt://prenf23-banthama.el.eee.intern",{clientId:"mqttjs01"});

//connection
console.log("connected flag  "+ client.connected);
client.on("connect",function(){	
    console.log("connected  "+client.connected);
    client.subscribe([topic], () => {
        console.log(`Subscribe to topic '${topic}'`)
    })
});

//error
client.on("error",function(error){
    console.log("Can't connect" + error);
    process.exit(1)
});


//server
const serverPort = 3001;

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    // send messages
    client.on('message', (topic, payload) => {
        console.log('Received Message:', topic, payload.toString())
        socket.broadcast.emit('hello', payload.toString());
    });
});

server.listen(serverPort, () => {
    console.log("Server is running on Port: " + serverPort);
});





