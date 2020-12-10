// Dependencies
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3050;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const notes = require("./develop/db/db.json");
// end Dependencies

// get requests
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./develop/public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./develop/public/index.html"));
});

app.get("/api/notes" /* should this be /:api/notes */, function (req, res) {
  const getNotes = req.params.api / notes;

  const returedNotes = notes.find((note) => note.routeName === getNotes);
  res.json(returedNotes);
});
// end get requests

//post requests
app.post("/api/notes" /* should this be /:api/notes */, function (req, res) {
  const body = req.body;
  console.log(body);
  res.end();

  notes.push(body);
  res.json(body);
});
//end post requests

// listen
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
// end listen
