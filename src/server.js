// Express related imports
const express= require("express");

// Env imports
require('dotenv').config()

// Importing Controllers
const {LinkedInController} = require("./controllers/LinkedInController.js");
// import { LinkedInController } from "./controllers/linkedInController";


// For handling the api calls
const app= express();


app.get("/", (req, res) => {
    res.send("Sairam")
});
app.get("/my-linkedin", LinkedInController.getUserData);

app.listen(process.env.PORT, () => {
    console.log(`Port is ${process.env.PORT}`);
});
