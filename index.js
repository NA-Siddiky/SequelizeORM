//import 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');

const port = 5050;

//body parser connection
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const sequelize = new Sequelize('to_do_sql', 'root', '12345678', {
    host: 'localhost',
    // port: 3306,
    dialect: 'mssql'
});

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('successfully connected sql');
//     })
//     .catch((err) => {
//         console.log(err, 'this has a error');
//     })

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

app.get("/", (req, res) => {
    res.send("this is working server is connected");
})

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})
