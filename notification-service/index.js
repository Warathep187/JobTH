const express = require("express");
const app = express();
const amqplib = require("amqplib");
const mongoose = require("mongoose");
const { createClient } = require("redis");

const client = createClient({
    url: process.env.REDIS_URL,
});

client.on("error", (err) => console.log("Redis Client Error", err));

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB is connected!"))
    .catch((e) => {
        console.log(e);
        process.exit(1);
    });

const connectToRedis = async () => {
    try {
        await client.connect();
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};

app.get("/api/notification", (req, res) => {
    res.send({
        message: "Hello, world from Notification Service",
    });
});

app.listen(8008, async () => {
    try {
        await amqplib.connect(process.env.RABBIT_URL);
        console.log("RabbitMQ is connected");
        connectToRedis()
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
    console.log("Notification service is running.");
});
