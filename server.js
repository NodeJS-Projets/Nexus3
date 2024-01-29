// Express related imports
const express= require("express");

// Env imports
require('dotenv').config()

// For handling the api calls
const app= express();


app.get("/", (req, res) => {
    res.send("Sairam")
});

app.get("/my-linkedin", (req, res) => {
    res.send("LinkedIn: Ashik Rai")
});


app.listen(process.env.PORT, () => {
    console.log(`Port is ${process.env.PORT}`);
});
