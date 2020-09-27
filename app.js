let express = require("express");
let moment = require("moment");

let app = express();
let port = process.env.PORT || 3000;

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/", express.static(__dirname + "/public"));

app.get("/api/timestamp", (req, res) => {
  let date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

app.get("/api/timestamp/:date_string", (req, res) => {
  let date = req.params.date_string;

  // if the date_string is a Number do the following
  if (!isNaN(date)) {
    res.json({
      unix: new Date(parseInt(date)).getTime(),
      utc: new Date(parseInt(date)).toUTCString(),
    });
  } // if date_string is given in date format i.e. YYY-M-D
  else if (moment.utc(date, "YYYY-M-D", true).isValid()) {
    res.json({
      unix: new Date(date).getTime(),
      utc: new Date(date).toUTCString(),
    });
  } // else send json object with error
  else {
    res.json({
      error: "Invalid Date",
    });
  }
});

app.listen(port, console.log("Server is listening at port " + port + "."));
