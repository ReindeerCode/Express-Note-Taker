// Dependencies ===============================================
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3050;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// end Dependencies ============================================

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./develop/public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./develop/public/index.html"));
});

// listen
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
// end listen
