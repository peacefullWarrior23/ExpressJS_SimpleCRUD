const passport = require('passport')

const session = require('express-session')
require('dotenv').config();

require('../auth.js');
const express = require('express')
const app = express()

const SESSION_SECRET= process.env.SESSION_SECRET;
app.use(session({secret: SESSION_SECRET}))
app.use(passport.initialize())
app.use(passport.session())



//Add support for API middlewares to work with JSON and  url encoded inputs
// app.use(express.json())
// app.use(express.urlencoded({extended : false}))



const authenticateGoogle = ()=>{
    console.log("**************DJP authenticateGoogle")
    passport.authenticate('google',{scope: ['email', 'profile   ']})
};

const authGoogleCallback = ()=> {
    console.log("=====================DJP authGoogleCallback")
    passport.authenticate('google',{
        successRedirect: '/auth/authenticated',
        failureRedirect: '/auth/failed'
    });
};

const authGoogleSuccess = ()=>{
    res.send(`Hi ${req.user.displayName}, you are now authenticated ! <br> <a href="/auth/logout"> Logout`)
};

const authGoogleFailure = () =>{
    res.send('Failed to Authenticate :(')
};

const authLogout = ()=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
      
    req.session.destroy()
    res.send('GoodBye !')
};

module.exports = {
    authenticateGoogle,
    authGoogleCallback,
    authGoogleSuccess,
    authGoogleFailure,
    authLogout
};