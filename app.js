require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const emailRoutes = require('./Routers/emailRoutes.js');


app.use(express.static(path.join(__dirname, "public")));
app.get("/", (re, res) => {
  res.render("index.html");
})


app.use('/api', emailRoutes); 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
