const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./config/config.js');
require('./db/mongoose');

let app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
  })
);

app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
