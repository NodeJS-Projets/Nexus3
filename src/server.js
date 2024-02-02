// Express related imports
const express= require("express");
const cors= require("cors")

// Env imports
require('dotenv').config()

// Importing Controllers
const {LinkedInController} = require("./controllers/LinkedInController.js");
// import { LinkedInController } from "./controllers/linkedInController";


// For handling the api calls
const app= express();
app.use(cors());

app.get("/", (req, res) => {
    res.send("Sairam")
});
app.get("/my-linkedin", LinkedInController.getUserData);

const serverPort= process.env.PORT || 9000
app.listen(serverPort, () => {
    console.log(`Port is ${serverPort}`);
});
