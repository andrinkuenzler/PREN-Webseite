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
const sensorTopicPet = "test/sensor/pet"
const sensorTopicKorken = "test/sensor/korken"
const sensorTopicStümmel = "test/sensor/Stümmel"
const sensorTopicWertgegenstände = "test/sensor/Wertgegenstände"

client.subscribe(hitTopic)
client.subscribe(noHitTopic)
client.subscribe(sensorTopicKorken)
client.subscribe(sensorTopicPet)
client.subscribe(sensorTopicStümmel)
client.subscribe(sensorTopicWertgegenstände)

var counterPet = 0
var counterKorken = 0
var counterStuemmel = 0
var counterWert = 0

//connection mqtt
console.log("connected flag  "+ client.connected);

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

server.listen(serverPort, () => {
    console.log("Server is running on Port: " + serverPort);
});

// nach verbinden auf neusten stand bringen
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    io.sockets.emit("pet", counterPet.toString());
    io.sockets.emit("korken", counterKorken.toString());
    io.sockets.emit("stuemmel", counterStuemmel.toString());
    io.sockets.emit("wert", counterWert.toString());
});

// counter / bilder updaten
client.on("message",function(topic, payload, packet){	
    if (topic === hitTopic) {
        fs.writeFile('../frontend/src/images/hit/hit.jpg', payload, err => {
            if (err) {
                console.error(err);
            }
        });
    }

    if (topic === noHitTopic) {
        console.log(noHitTopic)
        fs.writeFile('../frontend/src/images/noHit/noHit.jpg', payload, err => {
            if (err) {
                console.error(err);
            }
        });
    }

    if (topic === sensorTopicPet) {
        counterPet++
        io.sockets.emit("pet", counterPet.toString());
    }

    if (topic === sensorTopicKorken) {
        counterKorken++
        io.sockets.emit("korken", counterKorken.toString());
    }

    if (topic === sensorTopicStümmel) {
        counterStuemmel++
        io.sockets.emit("stuemmel", counterStuemmel.toString());
    }

    if (topic === sensorTopicWertgegenstände) {
        counterWert++
        io.sockets.emit("wert", counterWert.toString());
    }
});


