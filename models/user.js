const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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
  var token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET).toString();


  user.tokens.unshift({ access, token });

  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByCredentials = function (userName, password) {
  var User = this;
  return User.findOne({userName}).then((user) => {
    return new Promise((resolve, reject) => {
      if (!user) {
        reject(new Error('username not found'));
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject(new Error("password not correct"));
        }
      });
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

UserSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

module.exports.User = mongoose.model('User', UserSchema);
