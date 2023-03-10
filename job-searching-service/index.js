const express = require("express");
const app = express();
const amqplib = require("amqplib");
const { Client } = require("@elastic/elasticsearch");
const fs = require("fs");

const connectToElasticsearch = async () => {
    const client = new Client({
        node: process.env.ELASTIC_NODE,
        auth: {
            username: process.env.ELASTIC_USERNAME,
            password: process.env.ELASTIC_PASSWORD,
        },
        tls: {
            ca: fs.readFileSync("./http_ca.crt"),
            rejectUnauthorized: false,
        },
    });
    try {
        const health = await client.cluster.health();
        console.log(health);
    } catch (e) {
        throw new Error(e);
    }
};

app.get("/api/job-searching", (req, res) => {
    res.send({
        message: "Hello, world from Job Searching Service",
    });
});

app.listen(8006, async () => {
    try {
        await amqplib.connect(process.env.RABBIT_URL);
        console.log("RabbitMQ is connected");
        await connectToElasticsearch();
        console.log("Elasticsearch is connected");
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
    console.log("Job Searching service is running.");
});
