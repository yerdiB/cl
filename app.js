require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session')
const passport=require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

const dbConfig = require('./config/database.config.js');
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(session({
    secret: "then we need to replace it to .env file",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated() || req.session.isLoggedIn;
    next();
});
//Routing system
app.use('/',require('./routes/UserRoute'))
app.use("/event", require("./routes/EventRoute"));

app.get("/", function(req, res){
    res.render("home");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.get("/contact", function(req, res){
    res.render("contact")
});

app.get("/auth/google/",
    passport.authenticate('google',{ scope: ["profile"] })
)

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });

app.get("/logout",function (req, res){
    req.logout()
    res.redirect("/")
})

let port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});