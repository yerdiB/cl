const mongoose = require("mongoose");
//level 5
const passportLocalMongoose=require('passport-local-mongoose')
const passport=require('passport')

//level 6
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate')
//
//level 2
//const encrypt = require("mongoose-encryption");
//
let userSchema = new mongoose.Schema({
    email: String,
    password: String,
    //level 6
    googleId: String
});

//level 2
//const SECRET = "SuperSecretKey"; //later on we will replace it with env variable
//userSchema.plugin(encrypt, { secret: SECRET, encryptedFields: ["password"] });
//
//level 2.1 - it is better to hide our secret
//userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"] });

//level 5
userSchema.plugin(passportLocalMongoose)
//
//level 6
userSchema.plugin(findOrCreate)

let userModel = new mongoose.model("User", userSchema);
//level 5
passport.use(userModel.createStrategy())
//passport.serializeUser(userModel.serializeUser())
//passport.deserializeUser(userModel.deserializeUser())
//
//level 6
passport.serializeUser(function (user, done) {
    done(null, user.id)
})
passport.deserializeUser(function (id, done) {
    userModel.findById(id, function (err, user) {
        done(err,user)
    })
})

//level 6
passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        userModel.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));
//
module.exports = userModel;