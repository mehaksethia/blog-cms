const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "secret123",
  resave: false,
  saveUninitialized: true
}));

app.use(express.static("public"));

app.use("/api", require("./routes/auth"));

mongoose.connect("mongodb://127.0.0.1:27017/blogCMS")
.then(() => console.log("MongoDB Connected"));

app.listen(5000, () => console.log("Server running on 5000"));