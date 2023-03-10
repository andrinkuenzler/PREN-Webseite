#!/usr/bin/python3
# -*- coding: utf-8 -*-
import time
import random

from paho.mqtt import client as mqtt_client

broker = 'pren-gruppe-31'
port = 1883
topic = "testTopic"
client_id = f'temperature-sensor-1'
sensor = '/sys/bus/w1/devices/28-000008e43b09/w1_slave'

def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)
    client = mqtt_client.Client(client_id)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client

def readTempSensor(sensorName):
    f = open(sensorName, 'r')
    lines = f.readlines()
    f.close()
    return lines

def publish(client):
    while True:
        sensorData = readTempSensor(sensor)
        print(str(sensorData))
        client.publish(topic, str(sensorData))
        time.sleep(5)

def run():
    client = connect_mqtt()
    client.loop_start()
    publish(client)

run()
