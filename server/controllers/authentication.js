const jwt = require('jwt-simple');
const config = require('../config');

const User = require('../models/user');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next){
    //At this time User already has their email/password authed
    //We just need to give them a token
    res.send({token : tokenForUser(req.user)});
}

module.exports.signup = function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    //validation
    if (!email || !password) {
        return res.status(422).send({ error: 'Must provide email and password ' });
    }

    User.findOne({ email: email }, function (err, existingUser) {
        if (err) return next(err);
        //If user already exsists then send out an error message
        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use' });
        }

        //If a user does not exist , create and save user
        const user = new User({
            email: email,
            password: password
        });
        user.save(function (err) {
            if (err) return next(err);
            //respond the user is created/saved.
            res.json({ token: tokenForUser(user) });
        });
    });


}