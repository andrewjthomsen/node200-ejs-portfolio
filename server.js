const express = require("express");
const request = require("request");
const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const GoogleSpreadsheet = require("google-spreadsheet");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
creds = require("./client_secret.json");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.set("views", "./views");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/thanks", (req, res) => {
  res.render("thanks", { contact: req.body });
  console.log(req.body);

  // // GoogleSheets
  // let values = [
  //   [
  //     // Cell values ...
  //     req.body.firstName,
  //     req.body.lastName,
  //     req.body.email
  //   ]
  //   // Additional rows ...
  // ];
  // const resource = {
  //   values
  // };
  // this.sheetsService.spreadsheets.values.update(
  //   {
  //     spreadsheetId,
  //     range,
  //     valueInputOption,
  //     resource
  //   },
  //   (err, result) => {
  //     if (err) {
  //       // Handle error
  //       console.log(err);
  //     } else {
  //       console.log("%d cells updated.", result.updatedCells);
  //     }
  //   } https://docs.google.com/spreadsheets/d/1GJV4Bb2Tn7XFTEii38RbV1hv23GWdCd2YP-aNnMr_xA/edit#gid=0
  // );
  // Identifying which document we'll be accessing/reading from
  // Identifying which document we'll be accessing/reading from
  var doc = new GoogleSpreadsheet(
    "1GJV4Bb2Tn7XFTEii38RbV1hv23GWdCd2YP-aNnMr_xA"
  );

  // Authentication
  doc.useServiceAccountAuth(creds, function(err) {
    // Adding a row in tab #4 with the date and the number 1
    doc.addRow(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      },
      callback
    );

    function callback(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("You added your progress for the day.");
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`The server listening at http://localhost: ${PORT}`);
});

module.exports = app;
