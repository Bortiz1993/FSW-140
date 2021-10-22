const express = require("express");
const mysql = require("mysql");
const  {v4: uuidv4 } = require('uuid');
uuidv4()


//database connection string with relevant values
const db = mysql.createConnection({
host:   'localhost',
user:    'root',
password: '',
//establish connection to a specific database
database: 'avengers'


});

//established database connection
db.connect((err) => {
    if(err) throw err;
    console.log('Connected');
    // db.query("CREATE DATABASE avengers", function (err, result) {
    //     if(err) throw err;
    //     console.log("database created!")
    // });
});

const app = express();

app.use(express.json()) //must have in order to receive body.

app.listen('9000', () => {
    console.log('local host is running successfully');
});

//SELECT command to retrieve all rows at once
app.get('/avengers', (req, res) => {
    let sql = 'SELECT * FROM avengers';
    //execute query
db.query(sql, (err, result) => {
    if(err){
        throw err;
    }
    // console.log(result);
    res.send(result);
});
});

//execute INSERT query first row
app.post('/insert', (req, res) =>{
    // console.log(req.body)
    let post = {Name: req.body.Name , URL: uuidv4(), Gender: req.body.Gender}
    let sql = "INSERT INTO avengers SET ?";
    //Run command
    db.query(sql, post, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.send('first row inserted successfully')
    })
});

//Delete command
// app.get('/delete/:URL', (req, res) => {
//     let sql = `DELETE FROM avengers WHERE URL = ${req.params.URL}`;
//     //execute query
//     db.query(sql, (err, result) =>{
//         if(err){
//             throw err;
//         }
//         console.log(result)
//         res.send('specific row Deleted successfully')
//     });
//     });