const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    config = require('../config'),
    User = require('../models/User');
var opts = {}
var cookieExtractor = function(req) {
    var token = null;

    if (req && req.cookies) token = req.cookies['jwt'];
    return token;
};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = config.jwt.secret;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findById(jwt_payload.id, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
}
