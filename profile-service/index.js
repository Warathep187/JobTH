const express = require("express");
const app = express();
const amqplib = require("amqplib");
const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB is connected!"))
    .catch((e) => {
        console.log(e);
        process.exit(1);
    });

app.get("/api/profile", (req, res) => {
    res.send({
        message: "Hello, world from Profile Service",
    });
});

app.listen(8001, async () => {
    try {
        await amqplib.connect(process.env.RABBIT_URL);
        console.log("RabbitMQ is connected");
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
    console.log("Profile service is running.");
});
