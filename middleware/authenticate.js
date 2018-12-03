const mongoose = require('mongoose');
User = mongoose.model('User');


let authenticate = (req, res, next) => {

    let token = req.header('x_auth');

    User.findByToken(token).then((user)=>{

        if(!user)
            return Promise.reject();

        req.user = user;
        req.token = token;

        next();

    }).catch((e)=>{
        res.status(401).send();
    });
}

module.exports = {authenticate};
