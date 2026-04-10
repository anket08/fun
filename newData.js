// ================= IMPORTS =================
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");

// ================= APP SETUP =================
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Session middleware
app.use(session(
  {
    secret: "ipl_secret_key",
    resave: true,
    saveUninitialized: true
  }
));

// ================= DB CONNECTION =================
mongoose.connect("mongodb://127.0.0.1:27017/ipl")
  .then(() => console.log("✅ DB Connected"))
  .catch(err => console.log(err));

// ================= SCHEMA =================
const iplSchema = new mongoose.Schema({
  name: String,
  fran: String,
  Country: String,
  bid: Number   
});

const Ipl = mongoose.model("ipl", iplSchema);


// ================= HOME =================
app.get("/", (req, res) => {

  // Get last searched country from cookie
  const last = req.cookies.lastSearch || "None";

  res.send(`
<html>
<body>

<h2>Add Player</h2>

<form action="/post" method="POST">
  Name <input type="text" name="name"><br><br>
  IPL <input type="text" name="fran"><br><br>
  Country <input type="text" name="country"><br><br>
  Bid <input type="number" name="bid"><br><br>
  <button type="submit">Submit</button>
</form>

<hr>

<h3>Last Searched Country: ${last}</h3>

<form action="/srch" method="GET">
  <select name="cnt">
    <option>India</option>
    <option>Australia</option>
    <option>England</option>
    <option>South Africa</option>
  </select>
  <button type="submit">Search</button>
</form>

</body>
</html>
`);
});


// ================= INSERT =================
app.post("/post",  (req, res) => {
  const { name, fran, country, bid } = req.body;

  const player = new Ipl({
    name,
    fran,
    Country: country,
    bid
  });

  player.save();
  res.redirect("/");
});


// ================= SEARCH =================
app.get("/srch", async (req, res) => {

  const cnt = req.query.cnt;

  // Save cookie (last search)
  res.cookie("lastSearch", cnt);

  // Session: count searches
  if (req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }

  const results = await Ipl.find({ Country: cnt });

  res.send(`
<html>
<body>

<h2>Players from ${cnt}</h2>

<p>Total Searches (Session): ${req.session.count}</p>

<table border="1">
<tr>
  <th>Name</th>
  <th>Franchise</th>
  <th>Country</th>
  <th>Bid</th>
</tr>

${results.map(item => `
<tr>
  <td>${item.name}</td>
  <td>${item.fran}</td>
  <td>${item.Country}</td>
  <td>${item.bid}</td>
</tr>
`).join("")}

</table>

<br>
<a href="/">Go Back</a>

</body>
</html>
`);
});


// ================= SERVER =================
app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});