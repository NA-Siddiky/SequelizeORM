//import 
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');

const port = 5050;

const app = express();
//body parser connection
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//mysql connection
const sequelize = new Sequelize('to_do_sql', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql'
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

// app.get("/", (req, res) => {
//     res.send("this is working server is connected");
// })

//creating db table(create-C)
const blog_table = sequelize.define(
    "blog_table",
    {
        title: Sequelize.STRING,
        desc: Sequelize.TEXT,
    },
    { tableName: "blog_table" }
);

blog_table.sync();

//post data on table(post)
app.post('/', async (req, res) => {
    const title = req.body.title;
    const desc = req.body.desc;
    const saveBlog = blog_table.build({
        title,
        desc,
    })
    await saveBlog.save();
    res.send("data post successfully");
})

//get all data from table(read)
app.get('/', async (req, res) => {
    const alldata = await blog_table.findAll();
    res.send(alldata);
})

//update data on table(put)
app.put('/:id', (req, res) => {
    const data = req.body.data;
    blog_table.update(
        {
            desc: data,
        },
        {
            where: {
                id: req.params.id,
            }
        }
    )
    res.redirect('/');
})

//delete data on table(delete)
app.delete('/:id', (req, res) => {
    blog_table.destroy(
        {
            where: {
                id: req.params.id,
            }
        }
    )
    res.redirect('/');
})

//running server
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})
