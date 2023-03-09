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

app.get("/api/job", (req, res) => {
    res.send({
        message: "Hello, world from Job Service",
    });
});

app.get("/api/job/:job_id", (req, res) => {
    res.send({
        message: `Hello, Job ${req.params.job_id}`,
    });
});

app.listen(8002, async () => {
    try {
        await amqplib.connect(process.env.RABBIT_URL);
        console.log("RabbitMQ is connected");
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
    console.log("Job service is running.");
});
