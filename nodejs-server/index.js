const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io")
const cors = require("cors");
var mqtt = require('mqtt');
const fs = require('fs');

// connection to raspberry
var client = mqtt.connect("mqtt://prenf23-banthama.el.eee.intern",{clientId:"dhf9304582fdfsgg"});

const hitTopic = "test/image/processed/hit";
const noHitTopic = "test/image/processed/noHit";
const sensorTopic = "test/sensor"

client.subscribe(hitTopic)
client.subscribe(noHitTopic)

var counter = 0

//connection
console.log("connected flag  "+ client.connected);

client.on("message",function(topic, payload, packet){	
    if (topic === hitTopic) {
        console.log(hitTopic)
        fs.writeFile('../frontend/src/images/hit/hit.jpg', payload, err => {
            if (err) {
              console.error(err);
            }
            console.log('success Hit')
        });
    }

    if (topic === noHitTopic) {
        console.log(noHitTopic)
        fs.writeFile('../frontend/src/images/noHit/noHit.jpg', payload, err => {
            if (err) {
              console.error(err);
            }
            console.log('success no Hit')
        });
    }

    if (topic === sensorTopic) {
        console.log(sensorTopic)
    }
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

// client.on('message', (topic, payload) => {
//     // wird pro user geloggt
//     console.log('Received Message:', topic, payload.toString())
//     counter += 1
//     //console.log('Payload: ',payload)   
//     fs.writeFile('../frontend/src/images/placeholder.jpeg', payload, err => {
//         if (err) {
//           console.error(err);
//         }
//         console.log('success')
//       });
//     sendToClients(payload)
// });

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




