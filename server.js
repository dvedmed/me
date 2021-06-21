const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

/*var corsOptions = {
    origin: "http://localhost:8082",
};
app.use(cors(corsOptions));*/

const db = require("./app/models");
db.sequelize.sync();

//test init
app.get("/", (req, res) => {
    res.json({ message: "Monthly Expense Server initialized" });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});