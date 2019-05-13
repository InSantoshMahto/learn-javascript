'use strict';
const express = require('express');
const mysql = require('mysql');

const app = express();

app.get('/', (req, res) => {
    res.send("<h1 style='text-align:center'>node express mysql</h1>");
});

app.get('/register', (req, res) => {
    let firstName = req.query.first_name.toLowerCase();
    let lastName = req.query.last_name.toLowerCase();
    let emailId = req.query.email_id.toLowerCase();
    let contact = req.query.contact.toLowerCase();
    let address = req.query.address.toLowerCase();

    console.log(`data: ${firstName}, ${lastName}, ${emailId}, ${contact}, ${address}.`);
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'my_db'
    });

    connection.connect();

    let insertQuery = `INSERT INTO 'user_newform' (first_name, last_name, email_id, contact, address) values('${firstName}', '${lastName}', '${emailId}, '${contact}', '${address}')`

    connection.query(insertQuery, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
    });

    connection.end(
        () => {
            res.send("<h1>Successfully Registered</h1><a href='http://127.0.0.1:5500/other/help gaurav bhaiyya/task01.htm'>go back</a>");
        }
    );
});

app.listen(8080, () => {
    console.log(`server is listen on port 8080`);
});