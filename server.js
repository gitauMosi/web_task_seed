require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sequelize } = require("./app/models");
const path = require("path");

const authMiddleware = require("./app/middlewares/authMiddleware");

const authRoutes = require("./app/routes/authRoutes");
const todoRoutes = require("./app/routes/todoRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());


// ui renders
app.use(express.static(path.join(__dirname, "public")));

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "signup.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});



// api endpoints

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);


// handle errors
// 404 Error Handling Middleware
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "views", "404.html"));
});

//error handler
app.use((err, req, res, next) => {
    // Check if headers have already been sent
    if (!res.headersSent) {
       res.status(500).send("Internal Server Error");
    } else {
       next(err); 
    }
 });

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  console.log("Database connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
