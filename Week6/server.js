const express = require("express");
const mysql = require("mysql2");


//database connection string with relevant values
const db = mysql.createConnection({
host:   'localhost',
user:    'root',
password: ''
//establish connection to a specific database
});

//established database connection
db.connect(function(err) {
    if(err) throw err;
    console.log('Connected');
    db.query("CREATE DATABASE mydb", function (err, result) {
        if(err) throw err;
        console.log("database created!")
    });
});

const app = express();

app.listen('3000', () => {
    console.log('local host is running successfully');
});

//create database

// app.get('/createDB', (req, res) => {
//     let sql = 'CREATE DATABASE 10Oct2021';
//     //execute the sql query

//     db.query(sql, (err,result) => {
//         if(err){
//             throw err;
//         }
//         console.log(result);
//         res.send("10Oct2021 database created successfully")
//     });
// });

//create table

app.get('/createTable', (req, res) => {
    let sql = "CREATE TABLE postings(id INT auto_increment, title VARCHAR(50), message VARCHAR(100), PRIMARY KEY(id))";

    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }

    console.log(result);
    res.send("Postings table created successfully");
    });
});

//execute INSERT query first row
app.get('/insertRow1', (req, res) =>{
    let post = {title: 'First row', message: 'first message row'}
    let sql = "INSERT INTO postings SET ?";
    //Run command
    db.query(sql, post, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.send('first row inserted successfully')
    })
});

//insert row 2
app.get('/insertRow2', (req, res) =>{
    let post = {title: 'Second row', message: 'Second message row'}
    let sql = "INSERT INTO postings SET ?";
    //Run command
    db.query(sql, post, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.send('Second row inserted successfully')
    })
});

//SELECT command to retrieve all rows at once
app.get('/selectAll', (req, res) => {
    let sql = 'SELECT * FROM postings';
    //execute query
db.query(sql, (err, result) => {
    if(err){
        throw err;
    }
    console.log(result);
    res.send('All rows selected successfully');
});
});

//SELECT command to retrieve a specific row

app.get('selectOne/:id',(req, res) =>{
    let sql = `SELECT * FROM postings WHERE id= ${req.params.id}`;
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
app.get('/updateRow/:id', (req, res) =>{
    let newTitle = "Updated title-1";
    let sql = `UPDATE postings SET 'title=${newTitle}' WHERE id = ${req.params.id}`;
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
app.get('/deleteOne/:id', (req, res) => {
let sql = `DELETE FROM postings WHERE id= ${req.params.id}`;
//execute query
db.query(sql, (err, result) =>{
    if(err){
        throw err;
    }
    console.log(result)
    res.send('specific row Deleted successfully')
});
});

