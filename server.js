// Dependencies
const express = require("express");
const fs = require("fs");
const { request } = require("http");
const path = require("path");
const shortid = require("shortid");
const app = express();
const PORT = process.env.PORT || 8080;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// end Dependencies

// get requests
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/notes", function (req, res) {
  fs.readFile("./db/db.json", function (err, data) {
    if (err) throw err;
    let allNotes = JSON.parse(data);
    return res.json(allNotes);
  });
});
// end get requests

//post requests
app.post("/api/notes", function (req, res) {
  fs.readFile("./db/db.json", function (err, data) {
    if (err) throw err;
    let allNotes = JSON.parse(data);
    let newNote = {
      title: req.body.title,
      text: req.body.text,
      id: shortid.generate(),
    };
    allNotes.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(allNotes, null, 2), (err) => {
      if (err) throw err;
      res.send("200");
    });
  });
});
//end post requests

// delete request
app.delete("/api/notes/:id", function (req, res) {
  const deleteNote = req.params.id;
  fs.readFile("./db/db.json", function (err, data) {
    if (err) throw err;
    let allNotes = JSON.parse(data);
    function findNote(deleteNote, allNotes) {
      for (var i = 0; i < allNotes.length; i++) {
        if (allNotes[i].id === deleteNote) {
          allNotes.splice(i, 1);
        }
      }
    }
    findNote(deleteNote, allNotes);
    fs.writeFile("./db/db.json", JSON.stringify(allNotes, null, 2), (err) => {
      if (err) throw err;
      res.send("200");
    });
  });
});
// end delete request

// listen
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
// end listen
