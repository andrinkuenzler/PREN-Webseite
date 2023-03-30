const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io")
const cors = require("cors");
var mqtt = require('mqtt');
const fs = require('fs');


// connection to raspberry
const topic = "test/image/raw";
var client = mqtt.connect("mqtt://prenf23-banthama.el.eee.intern",{clientId:"dhf9304582fdfsgg"});
var counter = 0
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

client.on('message', (topic, payload) => {
    // wird pro user geloggt
    console.log('Received Message:', topic, payload.toString())
    counter += 1
    //console.log('Payload: ',payload)   
    fs.writeFile('../frontend/src/images/placeholder.jpeg', payload, err => {
        if (err) {
          console.error(err);
        }
        console.log('success')
      });
    sendToClients(payload)
});

function sendToClients(payload) {
    io.on("connection", (socket) => {
        console.log(`User Connected: ${socket.id}`);
        // send messages
        socket.broadcast.emit('message', payload.toString());
    });
}


server.listen(serverPort, () => {
    console.log("Server is running on Port: " + serverPort);
});





// io.on("connection", (socket) => {
//     console.log(`User Connected: ${socket.id}`);
//     // send messages
//     client.on('message', (topic, payload) => {
//         // wird pro user geloggt
//         console.log('Received Message:', topic, payload.toString())
//         counter += 1
//         fs.writeFile('../frontend/src/images/placeholder.jpeg', payload, err => {
//             if (err) {
//               console.error(err);
//             }
//             console.log('success')
//           });
//         socket.broadcast.emit('message', payload.toString());
//     });
// });




