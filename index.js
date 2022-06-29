//import 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const port = 5050;

app.get("/", (req, res) => {
    res.send("this is working server is connected");
})

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})
