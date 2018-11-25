const mongoose = require('mongoose');
const _ = require('lodash');
User = mongoose.model('User');

module.exports.createUser = async (req, res) => {
  let body = _.pick(req.body, ['userName', 'password']);
  if (!body.userName) {
    return res.status(400).send("please enter a username");
  }
  if (!body.password) {
    return res.status(400).send("please enter a password");
  }
  
  let user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();

  }).then((token) => {
    res.header('x-auth', token).send({ user });
  }).catch((e) => {
      res.status(400).send(e);
  });
}

module.exports.loginUser = async (req, res) => {
  let body = _.pick(req.body, ['userName', 'password']);
  if (!body.userName) {
    return res.status(400).send("please enter your username");
  }

  if (!body.password) {
    return res.status(400).send("please enter your password");
  }

  User.findByCredentials(body.userName, body.password).then((user) => {
    if (!user) {
      return res.status(400).send();
    }
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send({ user });
    });
  }).catch((e) => {
    if (e.message === 'username not found') {
      res.status(400).send({ msg: e.message });
    }
    if (e.message === 'password not correct') {
      res.status(400).send({ msg: e.message });
    } else {
      res.status(500).send();
    }
  });
};

module.exports.logout = async (req, res) => {
  User.findByToken(req.header('x-auth')).then((user) => {
    user.tokens = _.remove(user.tokens, (currentToken) => {
      return currentToken.token !== req.header('x-auth');
    });
    user.save();
    res.status(200).send({user});
  }).catch((err) => {
    res.status(500).send();
  });
}

module.exports.me = async(req, res) => {
    res.status(200).send(req.user);
}