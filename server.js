const express = require("express");
const app = express();

const bcrypt = require("bcrypt");
const route = require("./routes/routes");
const db = require("./DB/dbConnection");

app.set("view engine", "ejs");

app.use(express.static('public')); 
app.use(express.json());


app.use(express.urlencoded({ extended: false }));


app.use("/", route);

app.listen(3000, ()=> {
    console.log("server is Running");
});


