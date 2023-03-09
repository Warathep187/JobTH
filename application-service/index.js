const express = require("express");
const app = express();
const amqplib = require("amqplib");
const mysql = require("mysql2");

const connectToMysql = () => {
    const connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
    });
    connection.query('SELECT 1+1', function (err) {
        if(err) {
            throw new Error(err)
        }
        console.log("MySQL is connected");
    });
};

app.get("/api/application", (req, res) => {
    res.send({
        message: "Hello, world from Application Service",
    });
});

app.listen(8003, async () => {
    try {
        await amqplib.connect(process.env.RABBIT_URL);
        console.log("RabbitMQ is connected");
        connectToMysql();
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
    console.log("Application service is running.");
});
