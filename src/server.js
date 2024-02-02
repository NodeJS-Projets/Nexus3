// Express related imports
const express= require("express");
const cors= require("cors")
const bodyParser = require('body-parser');

// Env imports
require('dotenv').config()

// Importing routes
const mediumRoutes= require("./routes/v1/MediumRoutes")


// For handling the api calls
const app= express();
app.use(cors());
app.use(bodyParser.json());


// medium routes
app.use("/api/v1/my-medium/", mediumRoutes);

const serverPort= process.env.PORT || 9000
app.listen(serverPort, () => {
    console.log(`Port is ${serverPort}`);
});
