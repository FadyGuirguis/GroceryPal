const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: 'username is already taken',
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'password must be at least 6 characters']
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]

});

UserSchema.plugin(beautifyUnique);

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();


  user.tokens.unshift({ access, token });

  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByCredentials = function (userName, password) {
  let User = this;
  return User.findOne({ userName }).then((user) => {


    return new Promise((resolve, reject) => {
      if (!user) {
        reject(new Error('username not found'));
      }
      else if (user.password != password) {
          reject(new Error('password not correct'));
      }
      else {
        resolve(user);
      }
    });
  });
};

UserSchema.statics.findByToken = function (token) {
  let User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.removeToken = function (token) {
  let User = this;
  User.findByToken(token).then((user) => {
    user.tokens = _.remove(user.tokens, (currentToken) => {
      return currentToken.token === token;
    });
    user.save();
    return User;
  })
}

module.exports.User = mongoose.model('User', UserSchema);
