const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const profile = require("./profile");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// then define the route that will use your custom router
app.use("/profile", profile);
app.set("views");

app.set("view engine", "ejs");

// app.get('/contact', (req, res) => {
//   res.render('contact');
// });

// app.post('/thanks', (req, res) => {
//   res.render('thanks', { contact: req.body })
// });

app.get("/", (req, res) => {
  const data = {
    person: {
      firstName: "Tom",
      lastName: "Scott"
    }
  };
  // Notice now the data is the second argument passed to the template render method
  res.render("index", data);
});

app.listen(8080, () => {
  console.log("Listening at http://localhost:8080");
});
