var express = require("express");
var strftime = require("strftime");

var app = express();

app.get("/timestamp/:date", function (req, res) {
  var date = parseInt(req.params.date);
  var dateObj;
  
  if (isNaN(date)) { //natural string entered
    dateObj = new Date(req.params.date);
  } else {
    dateObj = new Date(date * 1000); //convert seconds to milliseconds
  }
  
  res.json({ unix: dateObj.getTime(), natural: strftime("%B %d, %Y", dateObj)});
});

app.get("/timestamp", function (req, res) {
  res.json({ unix: null, natural: null });
});

app.listen(8080, function () {
  console.log("App listening on port 8080");
});

//User Story: I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016).

//User Story: If it does, it returns both the Unix timestamp and the natural language form of that date.

//User Story: If it does not contain a date or Unix timestamp, it returns null for those properties.

//https://timestamp-ms.herokuapp.com/December%2015,%202015
//https://timestamp-ms.herokuapp.com/1450137600
//{ "unix": 1450137600, "natural": "December 15, 2015" }