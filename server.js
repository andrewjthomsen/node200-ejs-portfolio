const express = require("express");
const request = require("request");
const morgan = require("morgan");
const bodyParser = require("body-parser");


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

  // GoogleSheets 
  let values = [
    [
      // Cell values ...
      req.body.firstName,
      req.body.lastName,
      req.body.email
    ],
    // Additional rows ...
  ];
  const resource = {
    values,
  };
  this.sheetsService.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption,
    resource,
  }, (err, result) => {
    if (err) {
      // Handle error
      console.log(err);
    } else {
      console.log('%d cells updated.', result.updatedCells);
    }
  });
});




app.listen(PORT, () => {
  console.log(`The server listening at http://localhost: ${PORT}`);
});

module.exports = app;
