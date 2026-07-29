const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Film sitesi backend çalışıyor.")
});

app.listen(5000, () => {
    console.log("Server çalışıyor");
});