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

app.listen('9000', () => {
    console.log('local host is running successfully');
});

//create database

// app.get('/createDB', (req, res) => {
//     let sql = "CREATE DATABASE avengers";
//     //execute the sql query

//     db.query(sql, (err,result) => {
//         if(err){
//             throw err;
//         }
//         console.log(result);
//         res.send("avengers database created successfully")
//     });
// });

//create table

// app.get('/createTable', (req, res) => {
    
//     let sql = "CREATE TABLE avengers(id INT auto_increment, name VARCHAR(50), message VARCHAR(100), PRIMARY KEY(id))";

//     db.query(sql, (err, result) => {
//         if(err) {
//             throw err;
//         }

//     console.log(result);
//     res.send("avengers table created successfully");
//     });
// });

//execute INSERT query first row
app.get('/insertRow1', (req, res) =>{
    let post = {name: req.body.name , URL: uuidv4()}
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

// //insert row 2
// app.get('/insertRow2', (req, res) =>{
//     let post = {name: 'Second row', message: 'Second message row'}
//     let sql = "INSERT INTO avengers SET ?";
//     //Run command
//     db.query(sql, post, (err, result) => {
//         if(err){
//             throw err;
//         }
//         console.log(result);
//         res.send('Second row inserted successfully')
//     })
// });

//SELECT command to retrieve all rows at once
app.get('/avengers', (req, res) => {
    let sql = 'SELECT * FROM avengers';
    //execute query
db.query(sql, (err, result) => {
    if(err){
        throw err;
    }
    console.log(result);
    res.send(result);
});
});

//SELECT command to retrieve a specific row

app.get('/selectOne/:URL',(req, res) => {
    let sql = `SELECT * FROM avengers WHERE URL= ${req.params.URL}`;
    //execute query
    db.query(sql,(err, result) =>{
        if(err){
            throw err;
        }
        console.log(result)
       
        res.send('specific row selected successfully')
    });
});

//UPDATE command 
app.get('/updateRow/:URL', (req, res) =>{
    let newTitle = req.body.name
    let sql = `UPDATE avengers SET name = '${newTitle}' WHERE URL = ${req.params.URL}`;
    //execute query
    db.query(sql, (err, result) => {
        if(err){
            throw err;
        }
    console.log(result)
    res.send('row updated successfully')
    })

});

//Delete command
app.get('/deleteOne/:URL', (req, res) => {
let sql = `DELETE FROM avengers WHERE URL = ${req.params.URL}`;
//execute query
db.query(sql, (err, result) =>{
    if(err){
        throw err;
    }
    console.log(result)
    res.send('specific row Deleted successfully')
});
});

