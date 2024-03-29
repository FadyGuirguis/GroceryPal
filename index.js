const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const asyncMiddleware = require('express-async-handler');

require('./config/config.js');
require('./db/mongoose');

//models
let User = require('./models/user');

//controllers
let userController = require('./controllers/UserController');

//middleware
let authModule = require('./middleware/authenticate');

let app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
  })
);

app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); //Parses request bodies

app.use('/', express.static(__dirname + '/client' + '/build'));

// User routes
app.post('/register', asyncMiddleware(userController.createUser));
app.post('/login', asyncMiddleware(userController.loginUser));
app.post('/logout', authModule.authenticate, asyncMiddleware(userController.logout));
app.post('/me', authModule.authenticate, asyncMiddleware(userController.me));
app.post('/lists', authModule.authenticate, asyncMiddleware(userController.editLists));
app.post('/recipes', authModule.authenticate, asyncMiddleware(userController.recipes));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
