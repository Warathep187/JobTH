const express = require("express");
const app = express();
const prisma = require("./prisma");
const amqplib = require("amqplib");
const { createClient } = require("redis");

const client = createClient({
    url: process.env.REDIS_URL
});

client.on("error", (err) => console.log("Redis Client Error", err));

const connectToRedis = async () => {
    try {
        await client.connect();
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};

app.get("/api/auth", (req, res) => {
    res.send({
        message: "Hello, world from Auth Service",
    });
});

app.listen(8000, async () => {
    try {
        await amqplib.connect(process.env.RABBIT_URL);
        console.log("RabbitMQ is connected");
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
    await connectToRedis()
    console.log("Auth service is running.");
});
