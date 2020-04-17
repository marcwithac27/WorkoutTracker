const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const db = require("./Models/index");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://<marcwithac>:<100Grovewood!>@ds031628.mlab.com:31628/heroku_8j3kks78", 
{ 
 useMongoClient: true
}
);

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
