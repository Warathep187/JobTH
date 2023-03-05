const express = require("express");
const app = express();
const prisma = require("./prisma");

app.get("/api/auth", (req, res) => {
    res.send({
        message: "Hello, world from Auth Service",
    });
});

app.listen(process.env.PORT, async () => {
    try {
        await prisma.jobSeekers.findUnique({
            where: {
                id: "TEST",
            },
        });
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
    console.log("Auth service is running.");
});
