const express = require("express");
const { PrismaClient } = require("@prisma/client");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const favoriteRoutes = require("./routes/favoriteRoutes");
const listRoutes = require("./routes/listRoutes");

console.log("LIST ROUTES",listRoutes);

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/lists", listRoutes);

app.get("/", (req, res) => {
    res.send("Film sitesi backend çalışıyor.")
});

app.post("/test", (req, res) => {
    res.json({mesaj: "Test başarılı"});
});

app.listen(5000, () => {
    console.log("Server çalışıyor");
}); 