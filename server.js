const express = require("express");
const request = require("request");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static("public"));



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

//   const { firstName, lastName, email } = req.body;

//   const data = {
//     members: [
//       {
//         email_address: email,
//           status: 'subscribed',
//           merge_fields: {
//             FNAME: firstName,
//             LNAME: lastName,
//           }
//       }
//     ]
//   }

 // 2e95d1c2ec8ec4142bf8aaf04fca5f0e-us3





app.listen(PORT, () => {
  console.log(`The server listening at http://localhost: ${PORT}`);
});

module.exports = app;
