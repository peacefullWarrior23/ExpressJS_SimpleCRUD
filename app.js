const mongoose = require('mongoose')
const express = require('express')
const session = require('express-session')
const Product = require('./models/product.model.js')
const app = express()
const ProductRoute = require('./routes/product.route.js')
const passport = require('passport')
const port = process.env.PORT || 3000;

require('dotenv').config();

const SESSION_SECRET= process.env.SESSION_SECRET;
const mongoDB_connect_url = process.env.MONGODB_CONNECT_URL;
require('./auth')

//Add support for API middlewares to work with JSON and  url encoded inputs
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(session({secret: SESSION_SECRET}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/products', ProductRoute)

function isLoggedIn(req,res,next){
    req.user ? next() : res.sendStatus(401);
}

mongoose.connect(mongoDB_connect_url)
.then(()=>{
    console.log("Connected to the DB")
})
.catch(() => {
    console.log("Connection to DB failed")
});

app.get('/', (req, res) => {
    res.send("Hello from Express API <br><a href='/auth/google'> Sign in with Google");
});


app.get('/auth/google', 
    passport.authenticate('google',{scope: ['email', 'profile   ']})
);

app.get('/auth/google/callback', 
    passport.authenticate('google',{
        successRedirect: '/auth/authenticated',
        failureRedirect: '/auth/failed'
    }));


app.get('/auth/authenticated', isLoggedIn,(req,res) => {
    res.send(`Hi ${req.user.displayName}, you are now authenticated ! <br> <a href="/logout"> Logout`)
});

app.get('/logout',(req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
      
    req.session.destroy()
    res.send('GoodBye !')
})

app.get('/auth/failed', (req,res)=>{
    res.send('Failed to Authenticate :(')
})

module.exports = app