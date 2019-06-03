"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var expressValidator = require("express-validator");
var multer = require("multer");
var mysql = require("mysql");
var fs = require("fs");
const path = require("path");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.use(expressValidator());

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "test1",
  multipleStatements: true
});

app.post("/addUser", (req, res) => {
  console.log("in addUser", req.body);
  let PersonId = req.body.PersonId;
  let PersonName = req.body.PersonName;
  let Address = req.body.Address;
  let Gender = req.body.Gender;
  let Age = req.body.Age;
  let EmployementStatus = req.body.EmployementStatus;
  let EmployeeId = req.body.EmployeeId;
  let EmailId = req.body.EmailId;

  //validation

  req.checkBody("PersonId", "PersonId is required").notEmpty();
  req.checkBody("PersonName", "PersonName is required").notEmpty();
  req.checkBody("Address", "Address is required").notEmpty();
  req.checkBody("Gender", "Gender is required").notEmpty();
  req.checkBody("Age", "Age is required").notEmpty();
  req
    .checkBody("EmployementStatus", "EmployementStatus is required")
    .notEmpty();
  req.checkBody("EmployeeId", "EmployeeId is required").notEmpty();
  // req.checkBody('email_confirm', 'mail does not match').equals(req.body.email);
  req.checkBody("EmailId", "EmailId is required").notEmpty();
  req.checkBody("EmailId", "EmailId is invalid").isEmail();

  var errors = req.validationErrors();

  if (errors) {
    res.status(400).json({
      message: ""
    });

    // res.json({
    //     errors: result.array()
    // });
  } else {
    console.log(
      `data: ${PersonId}, ${Address}, ${Gender}, ${Age}, ${EmployementStatus}, ${EmployeeId}, ${EmailId}.`
    );

    let insertQuery =
      "INSERT INTO person (PersonId,PersonName, Address, Gender, Age, EmployementStatus, EmployeeId ,EmailId) values('" +
      `${PersonId}` +
      "','" +
      `${PersonName}` +
      "','" +
      `${Address}` +
      "','" +
      `${Gender}` +
      "','" +
      `${Age}` +
      "','" +
      `${EmployementStatus}` +
      "','" +
      `${EmployeeId}` +
      "','" +
      `${EmailId}` +
      "')";
    //var insertQuery = "INSERT INTO user_newform(first_name,last_name,email_id,contact,address) VALUES ('kaushik','singh','saurav3@xyz.com','5698569856','way 37')";
    console.log("******************", insertQuery);

    connection.query(insertQuery, function(error, results, fields) {
      if (!error) res.send(fields);
      else console.log(error);
    });
    connection.end(() => {
      res.send("<h1>Successfully submitted,Thank you</h1>");
    });
  }
});

app.post("/ad", (req, res) => {
  console.log("in ad", req.body);

  let EmployeeId = req.body.EmployeeId;
  let CompanyId = req.body.CompanyId;
  let Designation = req.body.Designation;
  let Region = req.body.Region;

  req.checkBody("EmployeeId", "EmployeeId is required").notEmpty();
  req.checkBody("CompanyId", "CompanyId is required").notEmpty();
  req.checkBody("Designation", "Designation is required").notEmpty();
  req.checkBody("Region", "Region is required").notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    res.json({
      error: errors
    });
  }

  console.log(`data: ${EmployeeId}, ${CompanyId}, ${Designation}, ${Region}.`);

  let insertQuery =
    "INSERT INTO employee (EmployeeId,CompanyId, Designation, Region) values('" +
    `${EmployeeId}` +
    "','" +
    `${CompanyId}` +
    "','" +
    `${Designation}` +
    "','" +
    `${Region}` +
    "')";
  //var insertQuery = "INSERT INTO user_newform(first_name,last_name,email_id,contact,address) VALUES ('kaushik','singh','saurav3@xyz.com','5698569856','way 37')";
  console.log("******************", insertQuery);
  connection.query(insertQuery, function(error, results, fields) {
    if (!error) res.send(fields);
    else console.log(error);
  });
  connection.end(() => {
    res.send("<h1>Successfully submitted,Thank you</h1>");
  });
});

app.post("/add", (req, res) => {
  console.log("in add", req.body);
  let CompanyId = req.body.CompanyId;
  let CompanyName = req.body.CompanyName;

  req.checkBody("CompanyId", "CompanyId is required").notEmpty();
  req.checkBody("CompanyName", "CompanyName is required").notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    res.json({
      error: errors
    });
  }

  console.log(`data: ${CompanyId}, ${CompanyName}.`);

  let insertQuery =
    "INSERT INTO Company (CompanyId,CompanyName) values('" +
    `${CompanyId}` +
    "','" +
    `${CompanyName}` +
    "')";
  //var insertQuery = "INSERT INTO user_newform(first_name,last_name,email_id,contact,address) VALUES ('kaushik','singh','saurav3@xyz.com','5698569856','way 37')";
  console.log("******************", insertQuery);
  connection.query(insertQuery, function(error, results, fields) {
    if (!error) res.send(fields);
    else console.log(error);
  });
  connection.end(() => {
    res.send("<h1>Successfully submitted,Thank you</h1>");
  });
});

var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    //destination is used to determine within which folder the uploaded files
    // should be stored. This can also be given as a string (e.g. '/tmp/uploads').
    //If no destination is given, the operating system’s default directory for temporary files is used.
    callback(null, "./uploads");
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now()); // filename is used to determine what the file should be named inside the folder.
    // If no filename is given, each file will be given a random name that doesn’t include
    // any file extension.
  }
});

var upload = multer({
  storage: storage
}).array("resume", 2); //The memory storage engine stores the files in memory as Buffer objects.
//console.log(upload);
app.post("/imgupload", function(req, res) {
  upload(req, res, function(err) {
    if (err) {
      return res.end("Error uploading file. please try again");
    }
    var id = req.body.id;
    res.end("File is uploaded");
    console.log(req);
    let insertQuery =
      "INSERT INTO imagesubmit (resume,id) value ('" +
      `${req.file.filename}` +
      "','" +
      `${req.file.filename}` +
      "','" +
      `${id}` +
      "')";
    console.log("******************", insertQuery);
    connection.query(insertQuery, function(error, results, fields) {
      if (!error) {
        res.send(fields);

        res.end(fields);
      }
      // res.end("File is uploaded");
      else console.log(error);
      // if (error) throw error;
      // console.log('The solution is: ', results[0]);
    });
    // connection.end(
    //     () => {
    //         res.send("<h1>Successfully submitted,Thank you</h1>");
    //     }
    // );
  });
});

app.delete("/delete", function(req, res) {
  //console.log("in del", req.body);
  //let id = req.body.id;
  console.log("=============", req.body);
  //console.log(`data: ${id}.`);

  let deletequery =
    'DELETE  FROM imagesubmit WHERE  resume="resume-1559551747515"';
  //console.log("******************", deletequery);
  console.log("hello:");

  connection.query(deletequery, function(error, results, fields) {
    console.log("i am here");
    let pathname = path.parse("/home/agile/Desktop/newtask/server/uploads");
    console.log(pathname);
    //var currentPath = path.join(directory_path, file);
    if (!error) {
      console.log(" am here now");
      console.log("++++++++++", req.body.resume);
      //let print = req.file.fieldname;
      //console.log(print);
      fs.unlink("uploads" + "/" + req.body.resume, function(err) {
        if (err) throw err;

        console.log("File deleted!");
      });
      // res.send(fields);
    } else console.log(error);
    connection.end(() => {
      res.send("<h1>Successfully submitted,Thank you</h1>");
    });
  });
});

// rest api to update record into mysql database
app.put("/updateemp", function(req, res) {
  connection.query(
    "UPDATE employee SET `EmployeeId`=?,`CompanyId`=?,`Designation`=?,`Region`=? where `EmployeeId`=?",
    [
      req.body.EmployeeId,
      req.body.CompanyId,
      req.body.Designation,
      req.body.Region,
      req.body.EmployeeId
    ],
    function(error, results, fields) {
      if (!error) res.send(fields);
      else console.log(error);
    }
  );
});

app.put("/updateCompany", function(req, res) {
  connection.query(
    "UPDATE Company SET `CompanyId`=?,`CompanyName`=? where `CompanyId`=?",
    [req.body.CompanyId, req.body.CompanyName, req.body.CompanyId],
    function(error, results, fields) {
      console.log("he;llo");
      if (!error) {
        console.log("correct");
        res.send(fields);
      } else {
        console.log("error");
        console.log(error);
      }
    }
  );
});

// app.put('/updateemp', function(req, res) {
//     connection.query('UPDATE person SET `PersonId`=?,`PersonName`=?,`Address`=?,`Gender`=?,`Age`=?,`e where `EmployeeId`=?', [req.body.EmployeeId, req.body.CompanyId, req.body.Designation, req.body.Region, req.body.EmployeeId], function(error, results, fields) {
//         if (!error)
//             res.send(fields);
//         else
//             console.log(error);
//     });
// });
app.listen(8081, () => {
  console.log(`server is listen on port 8081,please move forward`);
  console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
  console.log("******************");
});
