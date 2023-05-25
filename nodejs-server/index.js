const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io")
const cors = require("cors");
var mqtt = require('mqtt');
const fs = require('fs');

// connection to raspberry
var client = mqtt.connect("mqtt://prenf23-banthama.el.eee.intern",{clientId:"123324235423452345"});

const hitTopic = "test/image/processed/hit";
const noHitTopic = "test/image/processed/noHit";
const sensorTopicPet = "test/sensor/petcover"
const sensorTopicKorken = "test/sensor/bottlecap"
const sensorTopicStümmel = "test/sensor/fagend"
const sensorTopicWertgegenstände = "test/sensor/Wertgegenstände"
const sensorTopicStartStop = "test/aktor/startstop"

client.subscribe(hitTopic)
client.subscribe(noHitTopic)
client.subscribe(sensorTopicKorken)
client.subscribe(sensorTopicPet)
client.subscribe(sensorTopicStümmel)
client.subscribe(sensorTopicWertgegenstände)
client.subscribe(sensorTopicStartStop)

var counterPet = 0
var counterKorken = 0
var counterStuemmel = 0
var counterWert = 0

var runTimeFlag = false;

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
        origin: '*',
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

    if (topic === sensorTopicStartStop) {
        console.log(payload)
        if(!runTimeFlag){
            counterPet = 0
            counterKorken = 0
            counterStuemmel = 0
            counterWert = 0
            runTimeFlag = true
        }else {
            runTimeFlag = false
        }
    
    }

    if(runTimeFlag){
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
            console.log(topic)
            counterPet++
            io.sockets.emit("pet", counterPet.toString());
        }
    
        if (topic === sensorTopicKorken) {
            counterKorken++
            io.sockets.emit("korken", counterKorken.toString());
        }
    
        if (topic === sensorTopicStümmel) {
            console.log(topic)
            counterStuemmel++
            io.sockets.emit("stuemmel", counterStuemmel.toString());
        }
    
        if (topic === sensorTopicWertgegenstände) {
            counterWert++
            io.sockets.emit("wert", counterWert.toString());
        }
    }
    
});


